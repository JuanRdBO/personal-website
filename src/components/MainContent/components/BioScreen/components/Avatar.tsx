import Image from "next/image";
import styles from "../../../MainContent.module.scss";
import Link from "next/link";

export default function Avatar({
  name,
  picture,
  link,
  width = 256,
  height = 256,
  nameFontSize = 24,
}: {
  name?: string;
  picture: string;
  link?: string;
  width?: number;
  height?: number;
  nameFontSize?: number;
}) {
  const loaderProp = ({ src }: { src: any }) => {
    return src;
  };

  if (!picture) return <></>;

  return (
    <Link href={`/`} style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <div
          // className="flex-shrink-0 size-40 rounded-circle me-3"
          style={{
            // border: "2px solid red",
            height: height,
            width: width,
            borderRadius: "50%",
            overflow: "hidden",
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
          style={{ color: "black", paddingLeft: "10px", fontSize: nameFontSize }}
        >
          {name}
        </div>
      </div>
    </Link>
  );
}
