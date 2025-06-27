import { useState, useEffect } from 'react';
import Layout from '../src/components/Layout.jsx';
import toast from 'react-hot-toast';

// The page component that wraps our main logic
export default function MobileCheckoutPage() {
  return (
    <Layout title="Quick Checkout">
      <MobileCheckout />
    </Layout>
  );
}

// The component that contains the form and its logic
function MobileCheckout() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ person: '', item: '', team: '', quantity: 1 });

  // Fetch all available items when the component loads
  useEffect(() => {
    // Only fetch items that are not archived
    fetch('/api/inventory?is_archived=false')
      .then(res => res.json())
      .then(data => {
        // Also filter out items with 0 available quantity on the client-side
        setItems(data.filter(i => i.available_quantity > 0));
      });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const promise = fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, quantity: Number(form.quantity) }),
    });

    toast.promise(promise, {
      loading: 'Processing checkout...',
      success: (res) => {
        if (!res.ok) {
          // Manually throw an error if the response is not OK
          return res.json().then(err => { throw new Error(err.error || 'Checkout failed.') });
        }
        // Reset form on success
        setForm({ person: '', item: '', team: '', quantity: 1 });
        // Refresh the item list to show updated quantities
        fetch('/api/inventory?is_archived=false').then(r => r.json()).then(d => setItems(d.filter(i => i.available_quantity > 0)));
        return '✅ Checkout successful!';
      },
      error: (err) => `❌ ${err.toString()}`, // Display the specific error message
    });
  };

  return (
    <div>
      <h2 style={styles.h2}>Quick Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input name="person" placeholder="Your Name" value={form.person} onChange={handleChange} required style={styles.input} />
        
        <select name="item" value={form.item} onChange={handleChange} required style={styles.input}>
          <option value="">-- Select Item --</option>
          {items.map(i => (
            <option key={i.id} value={i.item_name}>
              {i.item_name} (Available: {i.available_quantity})
              {i.available_quantity / i.total_quantity <= 0.2 && " - Low Stock!"}
            </option>
          ))}
        </select>
        
        <select name="team" value={form.team} onChange={handleChange} required style={styles.input}>
          <option value="">-- Select Team --</option>
          <option>Baseball</option>
          <option>Basketball</option>
          <option>Cross Country</option>
          <option>Football</option>
          <option>Golf</option>
          <option>Soccer</option>
          <option>Swimming</option>
          <option>Tennis</option>
          <option>Track</option>
          <option>Volleyball</option>
          <option>Other</option>
        </select>
        
        <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} required style={styles.input} />
        
        <button type="submit" style={styles.btn}>Check Out</button>
      </form>
    </div>
  );
}

// Reusing the same style patterns for consistency
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
    boxSizing: 'border-box',
    fontSize: '1em',
    backgroundColor: '#fff', // Ensure select has a white background
  },
  btn: {
    width: '100%',
    padding: '14px',
    margin: '8px 0',
    borderRadius: '8px',
    border: 'none',
    background: '#28a745', // Green for a positive action
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.1em',
    cursor: 'pointer',
  }
};