import Avatar from "./Avatar";
import DateFormatter from "./DateFormatter";
import CoverImage from "./CoverImage";
import PostTitle from "./PostTitle";
import Head from "next/head";

export default function PostHeader({
  title,
  coverImage,
  date,
  description,
  author,
  slug,
}: {
  title: string;
  coverImage?: string;
  description: string;
  date: string;
  author?: { name: string; picture: string; link?: string };
  slug?: string;
}) {
  return (
    <>
      <Head>
        <title>{`${title} - Decaf`}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={coverImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Decaf_so" />
        <meta name="twitter:creator" content="@Decaf_so" />
        <meta name="twitter:title" content={`${title} - Decaf`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={coverImage} />
      </Head>
      <div className="bg-style-1">
        <div className="container pt-11 pt-lg-15 pb-9">
          <div className="row pb-8 pb-lg-11">
            <div className="col-md-10 col-lg-10 w-100">
              <PostTitle>{title}</PostTitle>
              {author?.picture && (
                <div className="d-none mb-6 d-md-block">
                  <Avatar name={author.name} picture={author.picture} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className=" position-relative mt-n12 container "
        style={{ maxWidth: "860px", marginLeft: "auto", marginRight: "auto" }}
      >
        {coverImage && <CoverImage slug={slug} title={title} src={coverImage} height={900} width={1600} />}
        <div className="d-flex mt-4 align-items-center justify-content-between">
          <div className="d-md-none mb-3">
            {author?.picture && <Avatar name={author.name} picture={author.picture} />}
          </div>
          <div className="d-flex align-items-center text-muted small">
            <DateFormatter dateString={date} />
          </div>
        </div>
      </div>
    </>
  );
}
