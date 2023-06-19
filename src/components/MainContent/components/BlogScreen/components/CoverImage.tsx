import ImageShadow from "react-image-shadow";
import "react-image-shadow/assets/index.css";

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

  const image = <ImageShadow src={src} width={width} shadowBlur={150} style={{ borderRadius: "10px" }} />;
  return <div>{image}</div>;
}
