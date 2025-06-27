import { useState, useEffect } from 'react';
import Layout from '../src/components/Layout.jsx';
import toast from 'react-hot-toast';

export default function MobileCheckoutPage() {
  return (
    <Layout title="Quick Checkout">
      <MobileCheckout />
    </Layout>
  );
}

function MobileCheckout() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemSearch, setItemSearch] = useState('');
  const [form, setForm] = useState({ person: '', item: '', team: '', quantity: 1 });

  const fetchAndSetItems = () => {
    fetch('/api/inventory?is_archived=false')
      .then(res => res.json())
      .then(data => {
        const availableItems = data.filter(i => i.available_quantity > 0);
        setItems(availableItems);
      });
  };

  useEffect(fetchAndSetItems, []);

  // This useEffect filters the dropdown as the user types
  useEffect(() => {
    if (!itemSearch) {
      setFilteredItems(items);
    } else {
      const results = items.filter(item =>
        item.item_name.toLowerCase().includes(itemSearch.toLowerCase())
      );
      setFilteredItems(results);
    }
  }, [itemSearch, items]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.item) {
        toast.error("Please select an item from the list.");
        return;
    }

    const promise = fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, quantity: Number(form.quantity) }),
    });

    toast.promise(promise, {
      loading: 'Processing checkout...',
      success: (res) => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.error || 'Checkout failed.') });
        }
        setForm({ person: '', item: '', team: '', quantity: 1 });
        setItemSearch(''); // Reset search bar
        fetchAndSetItems(); // Refresh item list
        return '✅ Checkout successful!';
      },
      error: (err) => `❌ ${err.toString().replace('Error: ', '')}`,
    });
  };

  return (
    <div>
      <h2 style={styles.h2}>Quick Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Your Name</label>
        <input name="person" placeholder="Your Name" value={form.person} onChange={handleChange} required style={styles.input} />
        
        <label style={styles.label}>Search for Item</label>
        <input
          type="text"
          placeholder="🔍 Start typing to find an item..."
          value={itemSearch}
          onChange={e => setItemSearch(e.target.value)}
          style={{ ...styles.input, marginBottom: 0 }}
        />
        <select name="item" value={form.item} onChange={handleChange} required style={styles.input} size={filteredItems.length > 1 ? 5 : 2}>
          {filteredItems.length > 0 ? (
            filteredItems.map(i => (
              <option key={i.id} value={i.item_name}>
                {i.item_name} (Available: {i.available_quantity})
                {i.available_quantity / i.total_quantity <= 0.2 && " - Low Stock!"}
              </option>
            ))
          ) : (
            <option value="" disabled>No items match your search.</option>
          )}
        </select>
        
        <label style={styles.label}>Team</label>
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
        
        <label style={styles.label}>Quantity</label>
        <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} required style={styles.input} />
        
        <button type="submit" style={styles.btn}>Check Out</button>
      </form>
    </div>
  );
}

const styles = {
  h2: { textAlign: 'center', color: '#333', marginBottom: '2rem' },
  label: { fontWeight: 'bold', fontSize: '0.9em', color: '#555', marginLeft: '4px' },
  input: { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1em', backgroundColor: '#fff' },
  btn: { width: '100%', padding: '14px', margin: '16px 0 8px 0', borderRadius: '8px', border: 'none', background: '#28a745', color: '#fff', fontWeight: 'bold', fontSize: '1.1em', cursor: 'pointer' },
};