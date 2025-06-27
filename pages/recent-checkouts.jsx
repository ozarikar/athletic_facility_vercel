import { useEffect, useState } from 'react';
import Layout from '../src/components/Layout.jsx';

// The page component that wraps our main logic
export default function RecentCheckoutsPage() {
  return (
    <Layout title="Recent Checkouts">
      <RecentCheckouts />
    </Layout>
  );
}

// The component that contains the table and its logic
function RecentCheckouts() {
  const [checkouts, setCheckouts] = useState([]);
  const [filteredCheckouts, setFilteredCheckouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch checkouts when the component loads
  useEffect(() => {
    fetch('/api/checkouts')
      .then(res => res.json())
      .then(data => {
        setCheckouts(data);
        setFilteredCheckouts(data);
      });
  }, []);

  // Filter the checkouts based on the search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCheckouts(checkouts);
      return;
    }
    const results = checkouts.filter(c =>
      c.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.team.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCheckouts(results);
  }, [searchTerm, checkouts]);

  return (
    <div>
      <h2 style={styles.h2}>Recent Checkouts</h2>
      <input
        type="text"
        placeholder="🔍 Search by person, item, or team..."
        style={styles.input}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Person</th>
              <th style={styles.th}>Item</th>
              <th style={styles.th}>Team</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredCheckouts.map(c => (
              <tr key={c.id} style={styles.tr}>
                <td style={styles.td}>{c.person}</td>
                <td style={styles.td}>{c.item}</td>
                <td style={styles.td}>{c.team}</td>
                <td style={styles.td}>{c.quantity}</td>
                <td style={styles.td}>{new Date(c.checkout_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Reusing the same style patterns for consistency
const styles = {
  h2: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '1em',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    background: '#fff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '700px', // Ensures table content isn't too squished
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