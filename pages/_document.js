import TwSizeIndicator from "@components/TwSizeIndicator";
import Layout from '@layouts/components/Layout';
import config from "@config/config.json";
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  // destructuring items from config object
  return (
    <Layout>
    <Html lang="en">
      <Head>
        {/* favicon */}
        <link rel="shortcut icon" href= "https://www.placea.in/_next/image?url=%2Fimages%2Ffavicon.png&w=828&q=75"/>
        {/* theme meta */}
        <meta name="theme-name" content="PLACEA" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </Head>
      <body>
        <Main />
        <TwSizeIndicator />
        <NextScript />
      </body>
    </Html>
    </Layout>
  );
};

export default Document;
