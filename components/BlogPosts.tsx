import { createFragmentContainer, graphql } from "react-relay";
import { BlogPosts_viewer } from "../__generated__/BlogPosts_viewer.graphql";
import BlogPostPreview from "./BlogPostPreview";

interface Props {
  viewer: BlogPosts_viewer;
}

const BlogPosts = ({ viewer }: Props) => (
  <div>
    <h1>Blog posts</h1>
    {viewer.allBlogPosts.edges.map(({ node }) => (
      <BlogPostPreview key={node.id} post={node} />
    ))}
  </div>
);

export default createFragmentContainer(BlogPosts, {
  viewer: graphql`
    fragment BlogPosts_viewer on Viewer {
      allBlogPosts(first: 10, orderBy: { createdAt: desc }) {
        edges {
          node {
            ...BlogPostPreview_post
            id
          }
        }
      }
    }
  `,
});
