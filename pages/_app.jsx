// _app.js (或 _app.tsx 或 _app.jsx)

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;