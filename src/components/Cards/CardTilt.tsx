import Tilt from "react-vanilla-tilt";
import styles from "./Cards.module.scss";

interface cardTiltProps {
  textHeader: string;
  textSubHeader: string;
  link1?: string;
  icon1?: string;
  link2?: string;
  icon2?: string;
}

export function CardTilt(props: cardTiltProps) {
  return (
    <Tilt className={`${styles.boxTransparent} `}>
      <div className="description">
        <h2 className="h2-card">{props.textHeader}</h2>
        <p className="p-card">
          {props.textSubHeader}
          <br />
          <br />
        </p>
      </div>
      <div className={styles.iconContainer}>
        {props.link1 && (
          <div className={styles.hoverableIcon}>
            <a
              style={{ margin: "10px" }}
              href={props.link1}
              target="_blank"
              rel="noreferrer"
            >
              <img src={props.icon1} alt="Link1" width="30" />
            </a>
          </div>
        )}
        {props.link2 && (
          <div className={styles.hoverableIcon}>
            <a
              style={{ margin: "10px" }}
              href={props.link2}
              target="_blank"
              rel="noreferrer"
            >
              <img src={props.icon2} alt="Link2" width="30" />
            </a>
          </div>
        )}
      </div>
    </Tilt>
  );
}
