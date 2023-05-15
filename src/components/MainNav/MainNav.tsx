import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import styles from "./MainNav.module.scss";

interface MainNavProps {
  setPageNo: Function;
}

export function MainNav(props: MainNavProps) {
  return (
    <div>
      <nav>
        <div
          className={styles.wrapper}
          style={{
            // minWidth: "98vw",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            className={`${styles.mainNav} ${styles.linkBio}`}
            style={{
              minWidth: isMobile ? "33%" : "7.5rem",
              marginRight: "0px",
            }}
            href="#bio"
            onClick={() => {
              console.log(`Styles bio: ${styles.bio} `);
              props.setPageNo(0);
            }}
          >
            Bio
          </Button>
          <Button
            className={`${styles.mainNav} ${styles.linkProjects}`}
            style={{
              minWidth: isMobile ? "33%" : "7.5rem",
              marginRight: "0px",
            }}
            href="#projects"
            onClick={() => {
              console.log(`Styles bio: ${styles.bio} `);
              props.setPageNo(1);
            }}
          >
            Projects
          </Button>
          <Button
            className={`${styles.mainNav} ${styles.linkBlog}`}
            style={{
              minWidth: isMobile ? "33%" : "7.5rem",
              marginRight: "0px",
            }}
            href="#blog"
            onClick={() => {
              console.log(`Styles bio: ${styles.bio} `);
              props.setPageNo(2);
            }}
          >
            Blog
          </Button>
        </div>
      </nav>
    </div>
  );
}
