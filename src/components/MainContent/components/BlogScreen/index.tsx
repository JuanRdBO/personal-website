import { isMobile } from "react-device-detect";

import styles from "./BlogScreen.module.scss";
import { memo, useContext } from "react";
import path from "path";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { BlogPostsContext } from "../../../providers/PostProvider";
import MoreStories from "./components/MoreStories";

const BlogScreen = () => {
  const { blogPosts } = useContext(BlogPostsContext);

  return (
    <div
      style={{
        marginTop: isMobile ? "20%" : "5%",
        width: "100vw",
      }}
    >
      <div
        className={`${styles.mainContent} ${isMobile ?? styles.mobileMainContent}`}
        style={{
          marginRight: isMobile ? "5%" : "20%",
          marginLeft: isMobile ? "5%" : "20%",
        }}
      >
        <p className={`${styles.mainContentHeader} ${styles.textBrown}`}>{"Blog"}</p>

        {/* <div className={styles.mainContentNormalText}>{JSON.stringify(blogPosts)}</div> */}

        <MoreStories posts={blogPosts} />
      </div>
    </div>
  );
};

export default memo(BlogScreen);
