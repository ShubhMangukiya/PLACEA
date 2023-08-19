import { markdownify } from "@lib/utils/textConverter";

const NotFound = ({ data }) => {
  const { frontmatter, content } = data;

  return (
    <section className="section">
      <div className="container">
      <rssapp-ticker id="GRvFjY8yaRR46pL4"></rssapp-ticker><script src="https://widget.rss.app/v1/ticker.js" type="text/javascript" async></script>
        <div className="flex h-[40vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4">{frontmatter.title}</h1>
            {markdownify(content, "div", "content prose-headings:text-text")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
