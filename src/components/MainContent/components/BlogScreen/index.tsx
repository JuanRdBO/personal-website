import { isMobile } from "react-device-detect";

import styles from "./BlogScreen.module.scss";
import { memo } from "react";

const BlogScreen = () => {
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
      </div>
    </div>
  );
};

export default memo(BlogScreen);
