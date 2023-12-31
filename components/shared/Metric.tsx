import { getNumberNamecasesString, nFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgSrc: string;
  alt: string;
  value: number | string;
  title?: string;
  namecases?: [string, string, string]; // one, two, five
  textStyles: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = (props: MetricProps) => {
  const { alt, imgSrc, textStyles, value, namecases, title, href, isAuthor } =
    props;

  const content = (
    <>
      <Image
        src={imgSrc}
        width={16}
        height={16}
        style={{ width: "16px", height: "16px" }}
        alt={alt}
        className={`object-contain ${isAuthor ? "rounded-full" : ""}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {typeof value === "string" ? value : nFormatter(value, 1)}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title || getNumberNamecasesString(value, namecases)}
        </span>
      </p>
    </>
  );
  if (href)
    return (
      <Link href={href} className="flex-center gap-1">
        {content}
      </Link>
    );
  return <div className="flex-center flex-wrap gap-1">{content}</div>;
};

export default Metric;
