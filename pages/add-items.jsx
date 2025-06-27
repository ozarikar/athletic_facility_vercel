import { useState, useEffect } from 'react';
import Layout from '../src/components/Layout.jsx';
import toast from 'react-hot-toast';

// The page component now wraps our main logic component
export default function ManageStockPage() {
  return (
    <Layout title="Manage Stock">
      <ManageStock />
    </Layout>
  );
}

// This component contains the toggle and shows the correct form
function ManageStock() {
  const [mode, setMode] = useState('new'); // 'new' or 'restock'

  return (
    <div>
      <div style={styles.toggleContainer}>
        <button
          style={mode === 'new' ? styles.toggleBtnActive : styles.toggleBtn}
          onClick={() => setMode('new')}
        >
          ➕ Add New Item
        </button>
        <button
          style={mode === 'restock' ? styles.toggleBtnActive : styles.toggleBtn}
          onClick={() => setMode('restock')}
        >
          📦 Restock Existing Item
        </button>
      </div>

      {mode === 'new' ? <AddNewItemForm /> : <RestockItemForm />}
    </div>
  );
}

// The form for creating brand new items
function AddNewItemForm() {
  const [form, setForm] = useState({ item_name: '', category: '', total_quantity: 1, description: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const promise = fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, total_quantity: Number(form.total_quantity) }),
    });

    toast.promise(promise, {
      loading: 'Adding new item...',
      success: (res) => {
        if (!res.ok) throw new Error('Failed to add item.');
        setForm({ item_name: '', category: '', total_quantity: 1, description: '' });
        return '✅ New item added successfully!';
      },
      error: '❌ Error adding item.',
    });
  };

  return (
    <div>
      <h2 style={styles.h2}>Add a Brand New Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="item_name" placeholder="Item Name" value={form.item_name} onChange={handleChange} required style={styles.input} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required style={styles.input} />
        <input name="total_quantity" type="number" min="1" placeholder="Initial Quantity" value={form.total_quantity} onChange={handleChange} required style={styles.input} />
        <textarea name="description" placeholder="Description (optional)" value={form.description} onChange={handleChange} style={{ ...styles.input, height: '100px' }} />
        <button type="submit" style={styles.btn}>Add New Item</button>
      </form>
    </div>
  );
}

// The form for restocking existing items
function RestockItemForm() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ itemId: '', quantity: 1 });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Fetch all items to populate the dropdown
  useEffect(() => {
    fetch('/api/inventory?is_archived=false')
      .then(res => res.json())
      .then(setItems);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.itemId) {
      toast.error('Please select an item to restock.');
      return;
    }
    const promise = fetch('/api/inventory/restock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId: Number(form.itemId), quantity: Number(form.quantity) }),
    });

    toast.promise(promise, {
      loading: 'Restocking item...',
      success: (res) => {
        if (!res.ok) throw new Error('Failed to restock.');
        setForm({ itemId: '', quantity: 1 });
        return '✅ Item restocked successfully!';
      },
      error: '❌ Error restocking item.',
    });
  };

  return (
    <div>
      <h2 style={styles.h2}>Add Stock to an Existing Item</h2>
      <form onSubmit={handleSubmit}>
        <select name="itemId" value={form.itemId} onChange={handleChange} required style={styles.input}>
          <option value="">-- Select Item to Restock --</option>
          {items.map(i => (
            <option key={i.id} value={i.id}>{i.item_name} (Current: {i.available_quantity})</option>
          ))}
        </select>
        <input name="quantity" type="number" min="1" placeholder="Quantity to Add" value={form.quantity} onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.btn}>Restock Item</button>
      </form>
    </div>
  );
}

const styles = {
    toggleContainer: {
        display: 'flex',
        marginBottom: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    toggleBtn: {
        flex: 1,
        padding: '15px',
        background: '#f0f0f0',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: '500',
        color: '#555',
        borderRight: '1px solid #ccc',
    },
    toggleBtnActive: {
        flex: 1,
        padding: '15px',
        background: '#003366',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 'bold',
    },
    h2: { textAlign: 'center', color: '#333', marginBottom: '2rem' },
    input: { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1em' },
    btn: { width: '100%', padding: '14px', margin: '8px 0', borderRadius: '8px', border: 'none', background: '#F9C32D', color: '#000', fontWeight: 'bold', fontSize: '1.1em', cursor: 'pointer' },
};