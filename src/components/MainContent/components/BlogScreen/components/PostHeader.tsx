import DateFormatter from "./DateFormatter";
import CoverImage from "./CoverImage";
import PostTitle from "./PostTitle";
import Head from "next/head";
import { Avatar } from "../../BioScreen/components";

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
    <div>
      <div
        style={{
          backgroundColor: "#C9CBD2",
          position: "absolute",
          height: "500px",
          width: "100%",
          top: "0%",
          right: "0%",
          zIndex: -1,
        }}
      />
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
        <div className="pt-11 pt-lg-15 pb-9">
          <div className="col pb-0 pb-lg-11">
            <div className="col-md-10 col-lg-10 w-100">
              <PostTitle>{title}</PostTitle>
            </div>
          </div>
        </div>
      </div>

      <div
        className=" position-relative mt-n12 container "
        style={{ maxWidth: "860px", marginLeft: "auto", marginRight: "auto" }}
      >
        {coverImage && <CoverImage slug={slug} title={title} src={coverImage} height={900} width={900} />}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "space-between",
            color: "black",
            width: "105%",
          }}
        >
          {author?.picture && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Avatar name={author.name} picture={author.picture} height={30} width={30} />
            </div>
          )}
          <DateFormatter dateString={date} />
        </div>
      </div>
    </div>
  );
}
