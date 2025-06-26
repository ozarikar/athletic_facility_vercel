import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <img src="/centre_college_logo.png" alt="Centre College Logo" style={{ maxWidth: 200, display: 'block', margin: '0 auto' }} />
      <h1 style={{ textAlign: 'center', margin: '32px 0 24px 0' }}>Centre College Athletic Office Supplies</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 24, margin: '32px 0' }}>
        <Link href="/mobile-checkout" passHref>
          <button style={btnStyle}>📱 Quick Checkout (Mobile)</button>
        </Link>
        <Link href="/recent-checkouts" passHref>
          <button style={btnStyle}>Recent Checkouts</button>
        </Link>
        <Link href="/current-inventory" passHref>
          <button style={btnStyle}>Current Inventory</button>
        </Link>
        <Link href="/add_items" passHref>
          <button style={btnStyle}>Add New Items</button>
        </Link>
      </nav>
    </div>
  );
}

const btnStyle = {
  background: '#F9C32D',
  color: '#000',
  padding: '18px 32px',
  borderRadius: 6,
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '1.2em',
  border: '2px solid #000',
  cursor: 'pointer',
  fontFamily: 'inherit'
};