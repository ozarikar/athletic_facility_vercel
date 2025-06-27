import { useEffect, useState } from 'react';
import Layout from '../src/components/Layout';

export default function CurrentInventoryPage() {
  return (
    <Layout title="Current Inventory">
      <CurrentInventory />
    </Layout>
  )
}

function CurrentInventory() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('/api/inventory').then(res => res.json()).then(setItems);
  }, []);
  return (
    <div>
      <h2 style={styles.h2}>Current Inventory</h2>
      <div style={styles.tableWrapper}> {/* This is the new wrapper */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Item Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Available</th>
              <th style={styles.th}>Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} style={styles.tr}>
                <td style={styles.td}>{i.item_name}</td>
                <td style={styles.td}>{i.category}</td>
                <td style={styles.td}>{i.total_quantity}</td>
                <td style={styles.td}>{i.available_quantity}</td>
                <td style={styles.td}>{i.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add these beautiful styles at the bottom of the file
const styles = {
  h2: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
  },
  tableWrapper: {
    overflowX: 'auto', // Magic for mobile responsiveness
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '600px', // Prevents table from looking squished on medium screens
  },
  th: {
    background: '#003366', // Centre Blue
    color: '#fff',
    fontWeight: 'bold',
    padding: '12px 15px',
    textAlign: 'left',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '12px 15px',
    color: '#333',
  }
};