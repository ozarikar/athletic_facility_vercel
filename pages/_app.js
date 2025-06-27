import { Toaster } from 'react-hot-toast';
import '../styles/globals.css'; // We will create this file next

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
          },
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;