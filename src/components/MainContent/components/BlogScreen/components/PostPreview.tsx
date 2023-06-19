import Avatar from "./Avatar";
import DateFormatter from "./DateFormatter";
import CoverImage from "./CoverImage";
import Link from "next/link";
import Image from "next/image";
import styles from "../BlogScreen.module.scss";
import { isMobile } from "react-device-detect";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author?: { name: string; picture: string; link: string };
  slug: string;
}) {
  console.log("PostPreview", { title, coverImage, date, excerpt, author, slug });

  return (
    <div
      className="col-md-6 mb-md-0 my-6"
      style={{
        // border: "1px solid black",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#291C1CE5",
      }}
    >
      <div className="mb-0">
        <Link href={`/blog/${slug}`}>
          {coverImage && (
            <Image alt={title} src={coverImage} height={900} width={1600} style={{ cursor: "pointer" }} />
          )}
        </Link>
      </div>

      <div className="mx-2">
        <div className={`${styles.mainContentSmallText}`}>
          <DateFormatter dateString={date} />
        </div>
        <div className="fs-4">
          <Link href={`/blog/${slug}`}>
            <div className={styles.mainContentNormalText}>{title}</div>
          </Link>
        </div>
        {/* <div
          className={`${styles.mainContentSmallText}`}
          style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {excerpt}
        </div> */}
        {author && <Avatar name={author.name} picture={author.picture} link={author.link} />}
      </div>
    </div>
  );
}
