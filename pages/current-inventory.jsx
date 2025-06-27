import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function CurrentInventory() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('/api/inventory').then(res => res.json()).then(setItems);
  }, []);
  return (
    <Layout title="Current Inventory">
      <div className="table-wrapper">
      <table>
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
    </Layout>
  );
}