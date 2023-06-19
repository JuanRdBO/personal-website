import Avatar from "./Avatar";
import DateFormatter from "./DateFormatter";
import CoverImage from "./CoverImage";
import Link from "next/link";
import Image from "next/image";

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
  return (
    <div className="col-md-6 mb-md-0 my-6">
      <div className="mb-6">
        <Link href={`/blog/${slug}`}>
          {/* <div className=" flex justify-center items-center" style={{ cursor: "pointer" }}> */}
          <Image
            className="rounded"
            alt={title}
            src={coverImage}
            height={900}
            width={1600}
            style={{ cursor: "pointer" }}
          />
          {/* </div> */}
        </Link>
      </div>
      <div className="small mb-3">
        <DateFormatter dateString={date} />
      </div>
      <div className="fs-4">
        <Link href={`/blog/${slug}`}>
          <a className="text-reset">{title}</a>
        </Link>
      </div>
      <div
        className="text-lg leading-relaxed mb-4"
        style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
      >
        {excerpt}
      </div>
      {author && <Avatar name={author.name} picture={author.picture} link={author.link} />}
    </div>
  );
}
