import { useState } from 'react';
import Layout from '../src/components/Layout';

export default function AddItemsPage() { // Rename component to be more descriptive
  return (
    <Layout title="Add New Item">
      <AddItems />
    </Layout>
  );
}

function AddItems() {
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
    <div>
      <h2 style={styles.h2}>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="item_name" placeholder="Item Name" /* ... */ style={styles.input} />
        <input name="category" placeholder="Category" /* ... */ style={styles.input} />
        <input name="total_quantity" type="number" /* ... */ style={styles.input} />
        <textarea name="description" placeholder="Description" /* ... */ style={{...styles.input, height: '100px'}} />
        <button type="submit" style={styles.btn}>Add Item</button>
      </form>
      {/* ... */}
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
