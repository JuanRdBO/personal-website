import { memo, useEffect, useState } from "react";
import styles from "./ContactButton.module.scss";
import { PostcardIcon } from "../../../../../icons/PostcardIcon";

const ContactButton = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <a
        className={`${styles.wrapper}`}
        onClick={() => window.open("https://cal.com/juanrdbo", "_blank", "noreferrer")}
      >
        <div className={`${styles.galaxyButton}`}>
          <button className={`${styles.ContactButton}`}>
            <span className={`${styles.spark}`} />
            <span className={`${styles.backdrop}`} />

            <PostcardIcon className={`${styles.text}`} width={"4rem"} height={"1.5rem"} color={"white"} />
            <span className={`${styles.text}`}>Contact</span>
          </button>
          <div className={`${styles.bodydrop}`} />
        </div>
      </a>
    </div>
  );
};

export default memo(ContactButton);
