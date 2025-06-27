// src/components/Layout.jsx
import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children, title = 'Athletic Office Supplies' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={styles.container}>
        <header style={styles.header}>
          <Link href="/" passHref>
            <button style={styles.homeButton}>🏠 Home</button>
          </Link>
          <img src="/centre_college_logo.png" alt="Centre College Logo" style={styles.logo} />
        </header>
        <main>{children}</main>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
  },
  logo: {
    height: '50px',
    width: 'auto',
  },
  homeButton: {
    background: '#003366', // Centre College blue
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    fontSize: '1em',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};