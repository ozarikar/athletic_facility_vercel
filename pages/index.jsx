// pages/index.jsx
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Centre College Athletic Supplies</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={styles.container}>
        <img src="/centre_college_logo.png" alt="Centre College Logo" style={styles.logo} />
        <h1 style={styles.h1}>Centre College Athletic Office Supplies</h1>
        <nav style={styles.nav}>
          <Link href="/mobile-checkout" passHref>
            <button style={styles.btn}>📱 Quick Checkout (Mobile)</button>
          </Link>
          <Link href="/recent-checkouts" passHref>
            <button style={styles.btn}>📋 Recent Checkouts</button>
          </Link>
          <Link href="/current-inventory" passHref>
            <button style={styles.btn}>📦 Current Inventory</button>
          </Link>
          <Link href="/add-items" passHref>
            <button style={styles.btn}>➕ Add New Items</button>
          </Link>
        </nav>
        <footer style={styles.footer}>
          Built by a Centre Student, Omkar
        </footer>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    justifyContent: 'center',
  },
  logo: {
    maxWidth: '200px',
    marginBottom: '2rem',
  },
  h1: {
    textAlign: 'center',
    margin: '0 0 2rem 0',
    color: '#333',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
  },
  btn: {
    background: '#F9C32D',
    color: '#000',
    padding: '18px 32px',
    borderRadius: '8px',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '1.2em',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease',
  },
  footer: {
    marginTop: '40px',
    fontSize: '0.8em',
    color: '#888',
  }
};