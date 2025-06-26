import { useState } from 'react';

export default function AddItems() {
  const [form, setForm] = useState({ item_name: '', category: '', total_quantity: 1, description: '' });
  const [message, setMessage] = useState('');
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, total_quantity: Number(form.total_quantity) })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Item added!');
      setForm({ item_name: '', category: '', total_quantity: 1, description: '' });
    } else {
      setMessage('❌ ' + (data.error || 'Error'));
    }
  };
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="item_name" placeholder="Item Name" value={form.item_name} onChange={handleChange} required style={inputStyle} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required style={inputStyle} />
        <input name="total_quantity" type="number" min="1" value={form.total_quantity} onChange={handleChange} required style={inputStyle} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} style={inputStyle} />
        <button type="submit" style={btnStyle}>Add Item</button>
      </form>
      {message && <div style={{ marginTop: 20 }}>{message}</div>}
    </div>
  );
}

const inputStyle = { width: '100%', margin: '8px 0', padding: 12, borderRadius: 4, border: '1px solid #ccc' };
const btnStyle = { ...inputStyle, background: '#F9C32D', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' };