import { GlobalStyles } from "@mui/material";
import { BlogScreen } from "../../components/MainContent/components";
import { getPosts } from "../../components/MainContent/components/BlogScreen/utils";
import { BlogPost } from "../../components/providers/PostProvider";
import { MainNav } from "../../components/MainNav/MainNav";
import { MainHeader } from "../../components/MainHeader/MainHeader";
import styles from "../styles/Home.module.scss";
import Home from "..";

export default function BlogPosts({ allPosts }: { allPosts: BlogPost[] }) {
  console.log("allPosts /blog", allPosts);

  return <Home allPosts={allPosts} defaultPage={2} />;
}

// Get all blog posts
export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { allPosts: posts },
  };
}
