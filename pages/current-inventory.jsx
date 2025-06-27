import { useEffect, useState } from 'react';
import Layout from '../src/components/Layout.jsx';
import toast from 'react-hot-toast';

export default function CurrentInventoryPage() {
  return (
    <Layout title="Current Inventory">
      <CurrentInventory />
    </Layout>
  );
}

function CurrentInventory() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'in', 'low', 'out'

  const fetchItems = () => {
    fetch('/api/inventory?is_archived=false')
      .then(res => res.json())
      .then(data => {
        setItems(data);
      });
  };

  useEffect(fetchItems, []);

  // Combined filter logic
  useEffect(() => {
    let results = items;

    // Apply status filter first
    if (activeFilter === 'in') {
      results = results.filter(item => item.available_quantity > 0);
    } else if (activeFilter === 'low') {
      results = results.filter(item => (item.available_quantity / item.total_quantity) <= 0.2 && item.available_quantity > 0);
    } else if (activeFilter === 'out') {
      results = results.filter(item => item.available_quantity === 0);
    }

    // Then apply search term filter to the already filtered results
    if (searchTerm) {
      results = results.filter(item =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(results);
  }, [searchTerm, items, activeFilter]);

  const handleArchive = async (itemId) => {
    const promise = fetch('/api/inventory/archive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId }),
    });

    toast.promise(promise, {
      loading: 'Archiving...',
      success: (res) => {
        if (!res.ok) throw new Error('Failed to archive.');
        fetchItems();
        return '🗑️ Item archived.';
      },
      error: '❌ Error archiving item.',
    });
  };

  const getStockStyle = (item) => {
    if (item.available_quantity === 0) {
      return { ...styles.td, color: '#dc3545', fontWeight: 'bold' };
    }
    const percentage = (item.available_quantity / item.total_quantity) * 100;
    if (percentage <= 20) {
      return { ...styles.td, color: '#b58500', fontWeight: 'bold' };
    }
    return styles.td;
  };

  return (
    <div>
      <h2 style={styles.h2}>Current Inventory</h2>
      <input
        type="text"
        placeholder="🔍 Search by name or category..."
        style={styles.input}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      
      <div style={styles.filterContainer}>
        <button style={activeFilter === 'all' ? styles.filterBtnActive : styles.filterBtn} onClick={() => setActiveFilter('all')}>All</button>
        <button style={activeFilter === 'in' ? styles.filterBtnActive : styles.filterBtn} onClick={() => setActiveFilter('in')}>In Stock</button>
        <button style={activeFilter === 'low' ? styles.filterBtnActive : styles.filterBtn} onClick={() => setActiveFilter('low')}>Low Stock</button>
        <button style={activeFilter === 'out' ? styles.filterBtnActive : styles.filterBtn} onClick={() => setActiveFilter('out')}>Out of Stock</button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Item</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Available</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(i => (
              <tr key={i.id} style={styles.tr}>
                <td style={styles.td}>{i.item_name}</td>
                <td style={styles.td}>{i.category}</td>
                <td style={getStockStyle(i)}>{i.available_quantity}</td>
                <td style={styles.td}>{i.total_quantity}</td>
                <td style={styles.td}>
                  {i.available_quantity === 0 && (
                    <button style={styles.archiveBtn} onClick={() => handleArchive(i.id)}>
                      Archive
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  h2: { textAlign: 'center', color: '#333', marginBottom: '1rem' },
  input: { width: '100%', padding: '12px', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1em' },
  filterContainer: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' },
  filterBtn: { padding: '8px 16px', borderRadius: '20px', border: '1px solid #ccc', background: '#f0f0f0', cursor: 'pointer', fontSize: '0.9em' },
  filterBtnActive: { padding: '8px 16px', borderRadius: '20px', border: '1px solid #003366', background: '#003366', color: 'white', cursor: 'pointer', fontSize: '0.9em', fontWeight: 'bold' },
  tableWrapper: { overflowX: 'auto', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)', background: '#fff' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' },
  th: { background: '#003366', color: '#fff', fontWeight: 'bold', padding: '12px 15px', textAlign: 'left' },
  tr: { borderBottom: '1px solid #ddd' },
  td: { padding: '12px 15px', color: '#333' },
  archiveBtn: { background: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
};