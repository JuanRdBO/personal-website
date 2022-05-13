import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [pageNo, setPageNo] = useState(0);
  const [bgStyle, setBgStyle] = useState("");

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
    }
  }, [pageNo]);

  return (
    <div id="app">
      <div className={`${styles.bg} ${bgStyle}`}>
        <header>
          <nav>
            <ul>
              <li>
                <a
                  className={styles.linkBio}
                  href="#bio"
                  onClick={() => {
                    console.log(`Styles bio: ${styles.bio} `);
                    setPageNo(0);
                  }}
                >
                  Bio
                </a>
              </li>
              <li>
                <a
                  className={styles.linkProjects}
                  style={{ color: "black" }}
                  href="#projects"
                  onClick={() => {
                    console.log(`Styles proj: ${styles.projects}`);
                    setPageNo(1);
                  }}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  className={styles.linkFindMe}
                  href="#findme"
                  onClick={() => {
                    console.log(`Styles findMe: ${styles.findMe}`);
                    setPageNo(2);
                  }}
                >
                  Find Me
                </a>
              </li>
            </ul>
          </nav>
          <div className={`${styles.transition} ${styles.transitionBio}`}></div>
          <div
            className={`${styles.transition} ${styles.transitionProjects}`}
          ></div>
          <div
            className={`${styles.transition} ${styles.transitionFindMe}`}
          ></div>
          <h1>Header</h1>
        </header>
        <div className={`${styles.dots} ${styles.dots1}`}></div>
        <div className={`${styles.dots} ${styles.dots2}`}></div>
        <main>
          {pageNo == 0 && <p key="bio">Hi! I'm a bio page.</p>}
          {pageNo == 1 && <p key="projects">This is a projects page.</p>}
          {pageNo == 2 && (
            <p key="find-me">
              See{" "}
              <a href="https://pehaa.com" target="_blank" rel="noopener">
                pehaa.com
              </a>{" "}
              for the complete website (built with Nuxt.js).
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
