import Image from "next/image";
import Link from "next/link";
export default function Avatar({ name, picture, link }: { name: string; picture: string; link?: string }) {
  const loaderProp = ({ src }: { src: any }) => {
    return src;
  };
  return (
    <a>
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 size-40 rounded-circle me-3">
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
        <div className="fw-semibold small">{name}</div>
      </div>
    </a>
  );
}
