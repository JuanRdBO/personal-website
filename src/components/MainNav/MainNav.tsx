import styles from "./MainNav.module.scss";

interface MainNavProps {
  setPageNo: Function;
}

export function MainNav(props: MainNavProps) {
  return (
    <nav>
      <ul>
        <li>
          <a
            className={styles.linkBio}
            href="#bio"
            onClick={() => {
              console.log(`Styles bio: ${styles.bio} `);
              props.setPageNo(0);
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
              props.setPageNo(1);
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
              props.setPageNo(2);
            }}
          >
            Find Me
          </a>
        </li>
      </ul>
    </nav>
  );
}
