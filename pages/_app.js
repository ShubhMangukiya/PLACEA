import config from "@config/config.json";
import theme from "@config/theme.json";
import { Analytics } from '@vercel/analytics/react';
import { JsonContext } from "context/state";
import Head from "next/head";
import Layout from '@layouts/components/Layout';
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";
import { useRouter } from "next/router";
import ReactGA from "react-ga";

const App = ({ Component, pageProps }) => {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const router = useRouter();
  const canonicalUrl = (`https://placea.in` + (router.asPath === "/" ? "": router.asPath)).split("?")[0];
  const [fontcss, setFontcss] = useState();
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)));
  }, [pf, sf]);
  useEffect(() => {
    setTimeout(() => {
      config.params.tag_manager_id && TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
    <JsonContext>
      <Head>
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"></meta>
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
    </Layout>
  );
};

export default App;
