import Image from "next/image";
import styles from "../../../MainContent.module.scss";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Avatar({
  name,
  picture,
  link,
  width = 256,
  height = 256,
  nameFontSize = "1.5rem",
}: {
  name?: string;
  picture: string;
  link?: string;
  width?: number;
  height?: number;
  nameFontSize?: number | string;
}) {
  const loaderProp = ({ src }: { src: any }) => {
    return src;
  };

  if (!picture) return <></>;

  return (
    <Link href={`/`} style={{ width: "100%" }}>
      <div
        className="flex flex-col md:flex-row"
        style={{
          display: "flex",
          // flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          width: "100vw",
        }}
      >
        <div
          // className="flex-shrink-0 size-40 rounded-circle me-3"
          style={{
            height: height,
            width: width,
            borderRadius: "50%",
            overflow: "hidden",
            marginLeft: "2rem",
            marginRight: "2rem",
          }}
        >
          <Image
            src={picture}
            width={width}
            height={height}
            className="rounded-circle"
            alt={name}
            layout="responsive"
            loader={loaderProp}
          />
        </div>
        <div
          className={styles.mainContentNormalText}
          style={{ color: "black", paddingLeft: "0px", fontSize: nameFontSize }}
        >
          {name}
        </div>
      </div>
    </Link>
  );
}
