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
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const [itemSearch, setItemSearch] = useState(''); // State for the item search input
  const [form, setForm] = useState({ person: '', item: '', team: '', quantity: 1 });

  useEffect(() => {
    fetch('/api/inventory?is_archived=false')
      .then(res => res.json())
      .then(data => {
        const availableItems = data.filter(i => i.available_quantity > 0);
        setItems(availableItems);
        setFilteredItems(availableItems); // Initially, show all available items
      });
  }, []);

  // This useEffect filters the dropdown as the user types
  useEffect(() => {
    const results = items.filter(item => 
      item.item_name.toLowerCase().includes(itemSearch.toLowerCase())
    );
    setFilteredItems(results);
  }, [itemSearch, items]);

  // ... (handleChange and handleSubmit functions remain the same)
  const handleChange = e => { setForm({ ...form, [e.target.name]: e.target.value }); };
  const handleSubmit = async e => { /* ... */ };

  return (
    <div>
      <h2 style={styles.h2}>Quick Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input name="person" placeholder="Your Name" value={form.person} onChange={handleChange} required style={styles.input} />
        
        {/* === NEW SEARCH INPUT FOR ITEMS === */}
        <input 
          type="text"
          placeholder="🔍 Search for an item..."
          value={itemSearch}
          onChange={e => setItemSearch(e.target.value)}
          style={{...styles.input, marginBottom: 0}}
        />

        {/* The dropdown now uses `filteredItems` */}
        <select name="item" value={form.item} onChange={handleChange} required style={styles.input}>
          <option value="">-- Select Item --</option>
          {filteredItems.map(i => (
            <option key={i.id} value={i.item_name}>
              {i.item_name} (Available: {i.available_quantity})
              {i.available_quantity / i.total_quantity <= 0.2 && " - Low Stock!"}
            </option>
          ))}
        </select>
        
        <select name="team" value={form.team} onChange={handleChange} required style={styles.input}>
          <option value="">-- Select Team --</option>
          {/* ... all your team options ... */}
        </select>
        
        <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} required style={styles.input} />
        
        <button type="submit" style={styles.btn}>Check Out</button>
      </form>
    </div>
  );
}

// ... (your styles object remains the same)
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
    backgroundColor: '#fff',
  },
  btn: {
    width: '100%',
    padding: '14px',
    margin: '8px 0',
    borderRadius: '8px',
    border: 'none',
    background: '#28a745',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.1em',
    cursor: 'pointer',
  }
};