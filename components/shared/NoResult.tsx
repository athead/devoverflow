import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface NoResultComponentProps {
  title: string;
  description: string;
  linkUrl?: string;
  linkText?: string;
}
const NoResult = (props: NoResultComponentProps) => {
  const { description, linkUrl, linkText, title } = props;
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result"
        width={270}
        height={200}
        style={{ width: "270px", height: "200px" }}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result"
        width={270}
        height={200}
        style={{ width: "270px", height: "200px" }}
        className="hidden object-contain dark:flex"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      {linkUrl && (
        <Link href={linkUrl}>
          <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-6 py-4 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
            {linkText || "Нажми тут"}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NoResult;
