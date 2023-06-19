// import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

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
  const image = (
    <Image
      priority
      src={src}
      alt={`Cover Image for ${title}`}
      //   className={cn("rounded-4", {
      //     rounded: slug,
      //   })}
      layout="responsive"
      width={width}
      height={height}
    />
  );
  return <div>{image}</div>;
}