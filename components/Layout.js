// components/Layout.js

import Head from 'next/head';

function Layout({ children }) {
  return (
    <>
      <Head>
        {/* Google Tag Manager script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RWW57SD920"></script>
        <script>
          {`
            // Google Tag Manager initialization
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-RWW57SD920');
          `}
        </script>
      </Head>
      {children}
    </>
  );
}

export default Layout;
