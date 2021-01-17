import { createFragmentContainer, graphql } from "react-relay";
import { BlogPostPreview_post } from "../../__generated__/BlogPostPreview_post.graphql";
import Link from "next/link";

interface Props {
  post: BlogPostPreview_post;
}

const BlogPostPreview = ({ post }: Props) => {
  return (
    <div>
      <Link href={`/${post.id}`}>{post.title}</Link>
    </div>
  );
};

export default createFragmentContainer(BlogPostPreview, {
  post: graphql`
    fragment BlogPostPreview_post on BlogPost {
      id
      title
    }
  `,
});
