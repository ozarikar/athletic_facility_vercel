import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function MobileCheckout() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ person: '', item: '', team: '', quantity: 1 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => setItems(data.filter(i => i.available_quantity > 0)));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, quantity: Number(form.quantity) })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Successfully checked out!');
      setForm({ person: '', item: '', team: '', quantity: 1 });
    } else {
      setMessage('❌ ' + (data.error || 'Error'));
    }
  };

  return (
    <Layout title="Quick Checkout">
      <form onSubmit={handleSubmit}>
        {/* inputs unchanged */}
        <button type="submit" style={{ marginTop:12 }}>Check Out</button>
      </form>
      {message && <p style={{ marginTop:12 }}>{message}</p>}
    </Layout>
  );
}