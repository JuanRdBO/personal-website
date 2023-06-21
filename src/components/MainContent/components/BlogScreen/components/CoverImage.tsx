import ImageShadow from "react-image-shadow";
import "react-image-shadow/assets/index.css";
import { isMobile } from "react-device-detect";

export default function CoverImage({
  title,
  src,
  slug,
  height,
  width,
}: {
  title: string;
  src: string;
  slug?: string;
  height?: number;
  width?: number;
}) {
  if (!src) return <></>;

  const image = (
    <div
      style={{
        // border: "1px solid red",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageShadow
        src={src}
        width={isMobile ? undefined : width}
        shadowBlur={150}
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
  return <div>{image}</div>;
}
