import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ maxWidth:420, margin:'0 auto', padding:'20px' }}>
      <img src="/centre_college_logo.png" style={{ width:160, display:'block', margin:'0 auto' }} alt="logo"/>
      <h1 style={{ textAlign:'center', margin:'28px 0 24px' }}>
        Centre College Athletic Supplies
      </h1>

      <Link href="/mobile-checkout"><button>📱 Quick Checkout</button></Link>
      <Link href="/recent-checkouts"><button style={{ marginTop:16 }}>Recent Checkouts</button></Link>
      <Link href="/current-inventory"><button style={{ marginTop:16 }}>Current Inventory</button></Link>
      <Link href="/add_items"><button style={{ marginTop:16 }}>Add New Items</button></Link>
    </main>
  );
}