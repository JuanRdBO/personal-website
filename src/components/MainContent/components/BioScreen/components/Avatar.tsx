import Image from "next/image";
export default function Avatar({ name, picture, link }: { name?: string; picture: string; link?: string }) {
  const loaderProp = ({ src }: { src: any }) => {
    return src;
  };

  if (!picture) return <></>;

  return (
    <div
      className="flex-shrink-0 size-40 rounded-circle me-3"
      style={{
        // border: "2px solid red",
        height: "100%",
        width: "60%",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <Image
        src={picture}
        width={256}
        height={256}
        className="rounded-circle"
        alt={name}
        layout="responsive"
        loader={loaderProp}
      />
    </div>
  );
}
