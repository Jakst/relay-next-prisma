import { graphql, fetchQuery } from "react-relay";
import { useQuery } from "relay-hooks";
import { initEnvironment } from "../lib/createEnvironment";
import { GetServerSideProps } from "next";
import { PostIdQuery } from "../__generated__/PostIdQuery.graphql";
import Details from "../components/details/Details";

const query = graphql`
  query PostIdQuery($postId: String!) {
    viewer {
      ...Details_viewer @arguments(postId: $postId)
    }
  }
`;

const Index = ({ postId }) => {
  const { error, data } = useQuery<PostIdQuery>(query, { postId });

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading</div>;

  return <Details viewer={data.viewer} />;
};

export const getServerSideProps: GetServerSideProps<
  any,
  { postId: string }
> = async ({ params }) => {
  const { environment, relaySSR } = initEnvironment();

  await fetchQuery(environment, query, { postId: params.postId });

  const relayData = (await relaySSR.getCache())?.[0];

  return {
    props: {
      // @ts-expect-error QueryPayload is a union type of which only one type contains .json
      relayData: !relayData ? null : [[relayData[0], relayData[1].json]],
      postId: params.postId,
    },
  };
};

export default Index;
