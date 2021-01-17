import { createFragmentContainer, graphql } from "react-relay";
import { BlogPostPreview_post } from "../__generated__/BlogPostPreview_post.graphql";

interface Props {
  post: BlogPostPreview_post;
}

const BlogPostPreview = ({ post }: Props) => {
  return <div key={post.id}>{post.title}</div>;
};

export default createFragmentContainer(BlogPostPreview, {
  post: graphql`
    fragment BlogPostPreview_post on BlogPost {
      id
      title
    }
  `,
});
