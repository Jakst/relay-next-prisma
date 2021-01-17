import { graphql, fetchQuery } from "react-relay";
import { useQuery } from "relay-hooks";
import { initEnvironment } from "../lib/createEnvironment";
import BlogPosts from "../components/list/BlogPosts";
import { GetServerSideProps } from "next";
import { pages_indexQuery } from "../__generated__/pages_indexQuery.graphql";

const query = graphql`
  query pages_indexQuery {
    viewer {
      ...BlogPosts_viewer
    }
  }
`;

const Index = () => {
  const { error, data } = useQuery<pages_indexQuery>(query);

  if (error) return <div>{error.message}</div>;

  if (!data) return <div>Loading</div>;

  return <BlogPosts viewer={data.viewer} />;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { environment, relaySSR } = initEnvironment();

  await fetchQuery(environment, query, {});

  const relayData = (await relaySSR.getCache())?.[0];

  res.setHeader("Cache-Control", "s-maxage=604800, stale-while-revalidate");

  return {
    props: {
      // @ts-expect-error QueryPayload is a union type of which only one type contains .json
      relayData: !relayData ? null : [[relayData[0], relayData[1].json]],
    },
  };
};

export default Index;
