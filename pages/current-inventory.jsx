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
        <table> … </table>
      </div>
    </Layout>
  );
}