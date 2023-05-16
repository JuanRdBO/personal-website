import { memo } from "react";
import { isMobile } from "react-device-detect";
import MortphText from "../../../MortphText";
import styles from "../../MainContent.module.scss";
import { ContactButton } from "./components";

const BioScreen = () => {
  return (
    <div
      style={{
        marginTop: isMobile ? "20%" : "5%",
        width: "100vw",
        /* border: "2px solid red", */
      }}
    >
      <div
        className={`${styles.mainContent} ${isMobile ?? styles.mobileMainContent}`}
        style={{
          marginRight: isMobile ? "5%" : "20%",
          marginLeft: isMobile ? "5%" : "20%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className={styles.mainContentHeader}>{"Bio"}</p>
          <ContactButton />
        </div>
        <div
          className={styles.mainContentSubHeader}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div style={{ paddingRight: "10px" }}>{"I write"}</div>
          <MortphText texts={["software", "websites", "apps"]} />
        </div>

        <div className={styles.mainContentNormalText}>
          I'm Joan, a passionate creator living in Mexico City. My work spans across multiple disciplines from
          web and app design/ coding, branding and database management/ optimisation.
        </div>
      </div>
    </div>
  );
};

export default memo(BioScreen);
