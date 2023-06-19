import { GlobalStyles } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { MainContent } from "../components/MainContent/MainContent";
import { MainHeader } from "../components/MainHeader/MainHeader";
import { MainNav } from "../components/MainNav/MainNav";
import styles from "../styles/Home.module.scss";
import { getPosts } from "../components/MainContent/components/BlogScreen/utils";
import BlogPostsProvider from "../components/providers/PostProvider";

export const Home = ({ allPosts, defaultPage = 0 }: { allPosts: any; defaultPage?: number }) => {
  console.log("allPosts", allPosts);

  const [pageNo, setPageNo] = useState(defaultPage);
  const [bgStyle, setBgStyle] = useState("");

  console.log("pageNo", pageNo);

  useEffect(() => {
    switch (pageNo) {
      case 0: {
        setBgStyle(styles.bio);
        break;
      }
      case 1: {
        setBgStyle(styles.projects);
        break;
      }
      case 2: {
        setBgStyle(styles.findMe);
        break;
      }
      default: {
        setBgStyle(styles.bio);
        break;
      }
    }
  }, [pageNo]);

  return (
    <BlogPostsProvider blogPosts={allPosts}>
      <div id="app">
        <GlobalStyles
          styles={{
            "*::-webkit-scrollbar": {
              width: "0em",
            },
            "*::-webkit-scrollbar-track": {
              "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              outline: "0px solid slategrey",
              borderRadius: "15px",
            },
          }}
        />
        <div className={`${styles.bg} ${bgStyle}`}>
          <header>
            <MainNav setPageNo={setPageNo} />
            <div className={`${styles.transition} ${styles.transitionBio}`}></div>
            <div className={`${styles.transition} ${styles.transitionProjects}`}></div>
            <div className={`${styles.transition} ${styles.transitionFindMe}`}></div>
            <MainHeader />
          </header>
          <div className={`${styles.dots} ${styles.dots1}`}></div>
          <div className={`${styles.dots} ${styles.dots2}`}></div>
          <main>
            <MainContent pageNo={pageNo} />
          </main>
        </div>
      </div>
    </BlogPostsProvider>
  );
};

export default Home;

// Get all blog posts
export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { allPosts: posts },
  };
}
