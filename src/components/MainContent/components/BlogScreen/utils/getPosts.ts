import path from "path";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";

async function getPosts() {
  let posts: any[] = [];
  for (const filename of fs.readdirSync(path.join(process.cwd(), "src", "_posts"))) {
    const { frontmatter } = await serialize(
      fs.readFileSync(path.join(process.cwd(), "src", "_posts", `${filename}`), "utf8"),
      { parseFrontmatter: true }
    );
    posts.push({
      ...frontmatter,
      id: filename.replace(".mdx", ""),
    });
  }
  console.log("posts", posts);
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default getPosts;
