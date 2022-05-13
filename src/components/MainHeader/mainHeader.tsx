import Tilt from "react-vanilla-tilt";
import styles from "./MainHeader.module.scss";

export function MainHeader() {
  return (
    <div
      style={{
        display: "grid",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tilt className={styles.tiltBox}>
        <h1>{"Joan"}</h1>
      </Tilt>
    </div>
  );
}
