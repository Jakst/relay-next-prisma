import { graphql, fetchQuery } from "react-relay";
import { useQuery } from "relay-hooks";
import { initEnvironment } from "../lib/createEnvironment";
import BlogPosts from "../components/BlogPosts";
import { GetServerSideProps } from "next";

const query = graphql`
  query pages_indexQuery {
    viewer {
      ...BlogPosts_viewer
    }
  }
`;

const Index = ({ environment }) => {
  const { error, props } = useQuery<any>(query);

  if (error) return <div>{error.message}</div>;

  if (!props) return <div>Loading</div>;

  return <BlogPosts viewer={props.viewer} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { environment, relaySSR } = initEnvironment();

  await fetchQuery(environment, query, {});

  const relayData = (await relaySSR.getCache())?.[0];

  return {
    props: {
      // @ts-expect-error QueryPayload is a union type of which only one type contains .json
      relayData: !relayData ? null : [[relayData[0], relayData[1].json]],
    },
  };
};

export default Index;
