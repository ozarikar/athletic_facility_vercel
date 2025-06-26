import { useEffect, useState } from 'react';

export default function RecentCheckouts() {
  const [checkouts, setCheckouts] = useState([]);
  useEffect(() => {
    fetch('/api/checkouts').then(res => res.json()).then(setCheckouts);
  }, []);
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h2>Recent Checkouts</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Person</th><th>Item</th><th>Team</th><th>Quantity</th><th>Time</th>
          </tr>
        </thead>
        <tbody>
          {checkouts.map(c => (
            <tr key={c.id}>
              <td>{c.person}</td>
              <td>{c.item}</td>
              <td>{c.team}</td>
              <td>{c.quantity}</td>
              <td>{new Date(c.checkout_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}