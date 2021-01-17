import { createFragmentContainer, graphql } from "react-relay";
import { Details_viewer } from "../../__generated__/Details_viewer.graphql";

interface Props {
  viewer: Details_viewer;
}

const BlogPosts = ({ viewer }: Props) => (
  <div>
    <h1>{viewer.BlogPost.title}</h1>
    <pre>Updated: {viewer.BlogPost.updatedAt}</pre>
    <div>{viewer.BlogPost.content}</div>
  </div>
);

export default createFragmentContainer(BlogPosts, {
  viewer: graphql`
    fragment Details_viewer on Viewer
    @argumentDefinitions(postId: { type: "String!" }) {
      BlogPost(id: $postId) {
        title
        content
        updatedAt
      }
    }
  `,
});
