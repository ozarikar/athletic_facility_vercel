import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children, title = 'Athletic Office Supplies' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={styles.pageContainer}>
        <div style={styles.contentWrapper}>
          <header style={styles.header}>
            <Link href="/" passHref>
              <button style={styles.homeButton}>🏠 Home</button>
            </Link>
            <img src="/centre_college_logo.png" alt="Centre College Logo" style={styles.logo} />
          </header>
          <main>{children}</main>
        </div>
        {/* === NEW FOOTER ADDED HERE === */}
        <footer style={styles.footer}>
          Built by Omkar, a Centre College Student
        </footer>
      </div>
    </>
  );
}

const styles = {
  // New styles to make the footer stick to the bottom
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  contentWrapper: {
    flex: '1 0 auto',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    width: '100%',
  },
  // ---
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    height: '40px',
    width: 'auto',
  },
  homeButton: {
    background: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    fontSize: '1em',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  // Style for the new footer
  footer: {
    flexShrink: 0,
    textAlign: 'center',
    padding: '20px',
    fontSize: '0.8em',
    color: '#888',
    marginTop: 'auto', // Pushes the footer to the bottom
  }
};