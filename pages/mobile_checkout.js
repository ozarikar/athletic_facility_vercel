import { useState, useEffect } from 'react';

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
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Quick Checkout</h2>
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
        <button type="submit" style={btnStyle}>Check Out</button>
      </form>
      {message && <div style={{ marginTop: 20 }}>{message}</div>}
    </div>
  );
}

const inputStyle = { width: '100%', margin: '8px 0', padding: 12, borderRadius: 4, border: '1px solid #ccc' };
const btnStyle = { ...inputStyle, background: '#28a745', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' };