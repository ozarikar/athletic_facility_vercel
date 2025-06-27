import { useEffect, useState } from 'react';
import Layout from '../src/components/Layout';
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

  const fetchItems = () => {
    // Only fetch items that are not archived
    fetch('/api/inventory?is_archived=false')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const results = items.filter(item =>
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchTerm, items]);

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
        fetchItems(); // Refresh the list from the server
        return '🗑️ Item archived.';
      },
      error: '❌ Error archiving item.',
    });
  };

  const getStockStyle = (item) => {
    // Return a copy of the base style with color modifications
    if (item.available_quantity === 0) {
      return { ...styles.td, color: '#dc3545', fontWeight: 'bold' };
    }
    const percentage = (item.available_quantity / item.total_quantity) * 100;
    if (percentage <= 20) {
      return { ...styles.td, color: '#b58500', fontWeight: 'bold' };
    }
    return styles.td; // Return the default style
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
  tableWrapper: { overflowX: 'auto', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)', background: '#fff' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' },
  th: { background: '#003366', color: '#fff', fontWeight: 'bold', padding: '12px 15px', textAlign: 'left' },
  tr: { borderBottom: '1px solid #ddd' },
  td: { padding: '12px 15px', color: '#333' },
  archiveBtn: { background: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
};