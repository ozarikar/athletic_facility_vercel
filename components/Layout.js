import Link from 'next/link';

export default function Layout({ title, children }) {
  return (
    <main style={wrapper}>
      {/* header */}
      <header style={headerStyle}>
        <Link href="/">
          <a style={homeLink}>🏠 Home</a>
        </Link>
        <h1 style={h1}>{title}</h1>
      </header>

      {/* page content */}
      <section style={{ width:'100%', maxWidth:800, margin:'0 auto' }}>
        {children}
      </section>
    </main>
  );
}

const wrapper = { minHeight:'100vh', padding:'12px' };
const headerStyle = { display:'flex', alignItems:'center', gap:12, marginBottom:24 };
const homeLink   = { fontWeight:600, fontSize:'1.1rem' };
const h1         = { fontSize:'1.3rem', margin:0, flex:1 };