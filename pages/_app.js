import config from "@config/config.json";
import theme from "@config/theme.json";
import { JsonContext } from "context/state";
import Head from "next/head";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import { initGA, logPageView } from '../lib/googleanalytics.js';
import "styles/style.scss";

const App = ({ Component, pageProps }) => {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState();
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)));
  }, [pf, sf]);

  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      G-RWW57SD920 && TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Google Analytics integration
  useEffect(() => {
    if (config.params.google_analytics_id) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", config.params.google_analytics_id);
    }
  }, []);

  return (
    <JsonContext>
      <Head>
        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${fontcss}`,
          }}
        />
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <Component {...pageProps} />
    </JsonContext>
  );
};

export default App;
