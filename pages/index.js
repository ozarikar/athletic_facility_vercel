import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <img src="/centre_college_logo.png" alt="Centre College Logo" style={{ maxWidth: 200, display: 'block', margin: '0 auto' }} />
      <h1>Centre College Athletic Office Supplies</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '32px 0' }}>
        <Link href="/mobile-checkout"><a style={btnStyle}>📱 Quick Checkout (Mobile)</a></Link>
        <Link href="/recent-checkouts"><a style={btnStyle}>Recent Checkouts</a></Link>
        <Link href="/current-inventory"><a style={btnStyle}>Current Inventory</a></Link>
        <Link href="/add-items"><a style={btnStyle}>Add New Items</a></Link>
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
  textDecoration: 'none',
  fontSize: '1.2em',
  border: '2px solid #000',
  fontFamily: 'Bebas Neue, Arial, sans-serif'
};