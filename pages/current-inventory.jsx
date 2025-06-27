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
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'low', or 'out'

  const fetchItems = () => {
    fetch('/api/inventory?is_archived=false')
      .then(res => res.json())
      .then(data => {
        setItems(data);
      });
  };

  useEffect(fetchItems, []);

  // This useEffect now handles BOTH search and filter buttons
  useEffect(() => {
    let results = items.filter(item =>
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeFilter === 'low') {
      results = results.filter(item => (item.available_quantity / item.total_quantity) <= 0.2 && item.available_quantity > 0);
    } else if (activeFilter === 'out') {
      results = results.filter(item => item.available_quantity === 0);
    }

    setFilteredItems(results);
  }, [searchTerm, items, activeFilter]); // Re-run when search, items, or filter changes

  // ... (handleArchive and getStockStyle functions remain the same)
  const handleArchive = async (itemId) => { /* ... */ };
  const getStockStyle = (item) => { /* ... */ };

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
      
      {/* === NEW FILTER BUTTONS === */}
      <div style={styles.filterContainer}>
        <button 
          style={activeFilter === 'all' ? styles.filterBtnActive : styles.filterBtn}
          onClick={() => setActiveFilter('all')}
        >
          All Items
        </button>
        <button 
          style={activeFilter === 'low' ? styles.filterBtnActive : styles.filterBtn}
          onClick={() => setActiveFilter('low')}
        >
          Low Stock
        </button>
        <button 
          style={activeFilter === 'out' ? styles.filterBtnActive : styles.filterBtn}
          onClick={() => setActiveFilter('out')}
        >
          Out of Stock
        </button>
      </div>

      <div style={styles.tableWrapper}>
        {/* ... your table code remains exactly the same ... */}
        <table style={styles.table}>
          <thead>...</thead>
          <tbody>
            {filteredItems.map(i => (
              <tr key={i.id} style={styles.tr}>
                {/* ... your table cells ... */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add the new filter styles to the styles object
const styles = {
  // ... all your existing styles (h2, input, tableWrapper, etc.)
  filterContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
  },
  filterBtn: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    background: '#f0f0f0',
    cursor: 'pointer',
    fontSize: '0.9em',
  },
  filterBtnActive: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #003366',
    background: '#003366',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9em',
    fontWeight: 'bold',
  },
  h2: { textAlign: 'center', color: '#333', marginBottom: '1rem' },
  input: { width: '100%', padding: '12px', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1em' },
  tableWrapper: { overflowX: 'auto', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.05)', background: '#fff' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' },
  th: { background: '#003366', color: '#fff', fontWeight: 'bold', padding: '12px 15px', textAlign: 'left' },
  tr: { borderBottom: '1px solid #ddd' },
  td: { padding: '12px 15px', color: '#333' },
  archiveBtn: { background: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
};