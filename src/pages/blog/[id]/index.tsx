import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";

import { PostHeader, Prose, YouTube } from "../../../components/MainContent/components/BlogScreen/components";

const components = { YouTube };

export default function BlogPost({ content, meta }: { content: any; meta: any }) {
  if (!content || !meta) return <div>Loading...</div>;
  return (
    <article>
      <PostHeader
        title={meta.title}
        coverImage={meta.coverImage}
        date={meta.date}
        author={meta.author}
        description={meta.description}
      />
      <div className="container markdown" style={{ maxWidth: "920px" }}>
        <Prose className="mt-8">
          <MDXRemote {...content} components={components} />
        </Prose>
      </div>
    </article>
  );
}
export async function getStaticProps({ params }: { params: any }) {
  // const { formattedPosts } = await getAllMediumPosts();
  // const { formattedPosts: mediumPosts } = await getAllMediumPosts();

  // const mdPosts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"]);
  const mdxSource = await serialize(
    fs.readFileSync(path.join(process.cwd(), "src", "_posts", `${params.id}.mdx`), "utf8"),
    { parseFrontmatter: true }
  );

  console.log("mdxSource", mdxSource);

  return {
    props: { content: mdxSource, meta: mdxSource.frontmatter },
  };
}

export async function getStaticPaths() {
  // const { formattedPosts } = await getAllMediumPosts();
  // const { formattedPosts: mediumPosts } = await getAllMediumPosts();

  // const mdPosts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"]);
  const posts = await getPostsPaths();

  console.log("posts", posts);

  return {
    paths: posts,
    fallback: true,
  };
}

async function getPostsPaths() {
  let posts: any[] = [];
  for (const filename of fs.readdirSync(path.join(process.cwd(), "src", "_posts"))) {
    posts.push({
      params: {
        id: filename.replace(".mdx", ""),
      },
    });
  }
  return posts;
}
