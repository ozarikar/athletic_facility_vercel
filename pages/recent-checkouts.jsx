import { useEffect, useState } from 'react';
import Layout from '../src/components/Layout';

export default function RecentCheckoutsPage() {
  return (
    <Layout title="Recent Checkouts">
      <RecentCheckouts />
    </Layout>
  )
}

function RecentCheckouts() {
  const [checkouts, setCheckouts] = useState([]);
  useEffect(() => {
    fetch('/api/checkouts').then(res => res.json()).then(setCheckouts);
  }, []);
  return (
    <div>
      <h2 style={styles.h2}>Current Inventory</h2>
      <div style={styles.tableWrapper}> {/* This is the new wrapper */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Person</th>
              <th style={styles.th}>Item</th>
              <th style={styles.th}>Team</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Time</th>
            </tr>
          </thead>
          <tbody>
            {checkouts.map(i => (
              <tr key={i.id} style={styles.tr}>
                <td style={styles.td}>{i.person}</td>
                <td style={styles.td}>{i.item}</td>
                <td style={styles.td}>{i.team}</td>
                <td style={styles.td}>{i.quantity}</td>
                <td style={styles.td}>{new Date(i.checkout_time).toLocaleString()}</td>
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