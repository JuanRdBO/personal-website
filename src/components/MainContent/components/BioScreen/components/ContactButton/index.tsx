import { memo, useEffect, useState } from "react";
import styles from "./ContactButton.module.scss";

const ContactButton = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.galaxyButton}`}>
        <button className={`${styles.ContactButton}`}>
          <span className={`${styles.spark}`} />
          <span className={`${styles.backdrop}`} />

          <span className={`${styles.text}`}>Explore</span>
        </button>
        <div className={`${styles.bodydrop}`} />
      </div>
    </div>
  );
};

export default memo(ContactButton);
