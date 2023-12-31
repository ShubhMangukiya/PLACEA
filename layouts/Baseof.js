import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import Head from "next/head";
import { useRouter } from "next/router";

const Base = ({
  title,
  meta_title,
  description,
  image,
  children,
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const base_url = 'https://www.placea.in'
  const router = useRouter();

  return (
    <>
      <Head>
        {/* title */}
        <title>
          {plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        </title>

        {/* meta-description */}
        <meta
          name="description"
          content={plainify(description ? description : meta_description)}
        />

        {/* author from config.json */}
        <meta name="author" content={meta_author} />

        {/* og-title */}
        <meta
          property="og:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* og-description */}
        <meta
          property="og:description"
          content={plainify(description ? description : meta_description)}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${base_url}/${router.asPath.replace("/", "")}`}
        />

        {/* twitter-title */}
        <meta
          name="twitter:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* twitter-description */}
        <meta
          name="twitter:description"
          content={plainify(description ? description : meta_description)}
        />

        {/* og-image */}
        <meta
          property="og:image"
          content={`${base_url}/_next/image?url=${image ? image : meta_image}&w=2048&q=75`}
        />

        {/* twitter-image */}
        <meta
          name="twitter:image"
          content={`${base_url}/_next/image?url=${image ? image : meta_image}&w=2048&q=75`}
        />
        <meta name="twitter:card" content={`${base_url}/_next/image?url=${image ? image : meta_image}&w=2048&q=75`} />

        <meta property="fb:pages" content="103958732125062"></meta>
        <meta name="facebook-domain-verification" content="va90yeoyhr6g6j75dreuqgyo17hmp7" />
      </Head>
      <Header />
      {/* main site */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Base;
