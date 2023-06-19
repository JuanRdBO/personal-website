import { BlogPost } from "../../../../providers/PostProvider";
import PostPreview from "./PostPreview";

export default function MoreStories({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <div className="row">
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.id}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </>
  );
}
