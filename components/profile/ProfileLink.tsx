import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileLinkProps {
  imgUrl: string;
  href?: string;
  title: string;
}
const ProfileLink = (props: ProfileLinkProps) => {
  const { imgUrl, title, href } = props;
  return (
    <div className="flex-center gap-1">
      <Image
        src={imgUrl}
        alt="icon"
        width={20}
        height={20}
        style={{ width: "20px", height: "20px" }}
      />
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="paragraph-medium text-accent-blue"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
