import { useState, useEffect } from 'react';
import Layout from '../src/components/Layout';

export default function MobileCheckoutPage() { // Rename component to be more descriptive
  return (
    <Layout title="Quick Checkout">
      <MobileCheckout />
    </Layout>
  );
}

function MobileCheckout() {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input name="person" placeholder="Your Name" value={form.person} onChange={handleChange} required style={inputStyle} />
        <select name="item" value={form.item} onChange={handleChange} required style={inputStyle}>
          <option value="">Select Item</option>
          {items.map(i => (
            <option key={i.id} value={i.item_name}>{i.item_name} (Available: {i.available_quantity})</option>
          ))}
        </select>
        <select name="team" value={form.team} onChange={handleChange} required style={inputStyle}>
          <option value="">Select Team</option>
          <option>Basketball</option>
          <option>Football</option>
          <option>Soccer</option>
          <option>Baseball</option>
          <option>Track</option>
          <option>Swimming</option>
          <option>Tennis</option>
          <option>Golf</option>
          <option>Cross Country</option>
          <option>Volleyball</option>
          <option>Other</option>
        </select>
        <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={{ marginTop:12 }}>Check Out</button>
      </form>
      {message && <p style={{ marginTop:12 }}>{message}</p>}
    </div>
  );
}

// Add some styles at the bottom
const styles = {
  h2: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box', // Important for consistent sizing
    fontSize: '1em',
  },
  btn: {
    width: '100%',
    padding: '14px',
    margin: '8px 0',
    borderRadius: '8px',
    border: 'none',
    background: '#F9C32D', // Vercel Gold
    color: '#000',
    fontWeight: 'bold',
    fontSize: '1.1em',
    cursor: 'pointer',
  }
};