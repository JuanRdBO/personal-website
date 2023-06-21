import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";

import { PostHeader, Prose, YouTube } from "../../../components/MainContent/components/BlogScreen/components";

const components = { YouTube };
const BlogPost = ({ content, meta }: { content: any; meta: any }) => {
  if (!content || !meta) return <div>Loading...</div>;

  const author = {
    name: "Joan Ruiz de Bustillo Ohngemach",
    picture: require("../../../../public/img/profilePic.png"),
  };

  return (
    <article>
      <PostHeader
        title={meta.title}
        coverImage={meta.coverImage}
        date={meta.date}
        author={author}
        description={meta.description}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="prose container markdown"
          style={{
            maxWidth: "1200px",
            // border: "1px solid black",
            color: "black",
            textAlign: "justify",
            paddingRight: "5%",
            paddingLeft: "5%",
          }}
        >
          <Prose className="mt-0">
            <MDXRemote {...content} components={components} />
          </Prose>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;

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
