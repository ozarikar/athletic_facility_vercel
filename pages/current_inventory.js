import { useEffect, useState } from 'react';

export default function CurrentInventory() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('/api/inventory').then(res => res.json()).then(setItems);
  }, []);
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h2>Current Inventory</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Item Name</th><th>Category</th><th>Total</th><th>Available</th><th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td>{i.item_name}</td>
              <td>{i.category}</td>
              <td>{i.total_quantity}</td>
              <td>{i.available_quantity}</td>
              <td>{i.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}