import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";
import { getRegularPage } from "@lib/contentParser";
import Layout from '@layouts/components/Layout';

const notFound = ({ data }) => {
  return (
    <Layout>
    <Base>
      <NotFound data={data} />
    </Base>
    </Layout>
  );
};

// get 404 page data
export const getStaticProps = async () => {
  const notFoundData = await getRegularPage("404");
  return {
    props: {
      data: notFoundData,
    },
  };
};

export default notFound;
