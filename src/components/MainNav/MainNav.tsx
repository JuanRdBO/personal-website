import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import styles from "./MainNav.module.scss";

interface MainNavProps {
  setPageNo: Function;
}

export function MainNav(props: MainNavProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div>
      <nav>
        <div
          style={{
            minWidth: "98vw",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            className={`${styles.mainNav} ${styles.linkBio}`}
            style={{
              minWidth: "7.5rem",
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
              minWidth: "7.5rem",
            }}
            href="#bio"
            onClick={() => {
              console.log(`Styles bio: ${styles.bio} `);
              props.setPageNo(1);
            }}
          >
            Projects
          </Button>
          <Button
            className={`${styles.mainNav} ${styles.linkFindMe}`}
            style={{
              minWidth: "7.5rem",
              marginRight: "auto",
            }}
            href="#bio"
            onClick={() => {
              console.log(`Styles bio: ${styles.bio} `);
              props.setPageNo(2);
            }}
          >
            Find Me
          </Button>
        </div>
      </nav>
    </div>
  );
}
