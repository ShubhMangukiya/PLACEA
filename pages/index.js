import BlogPagination, { getStaticProps } from "./page/[slug]";
export { getStaticProps };
import Script from 'next/script'

function Home() {
  return (
    <div className="container">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-RWW57SD920" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-RWW57SD920');
        `}
      </Script>
    </div>
  )
}
export default BlogPagination;