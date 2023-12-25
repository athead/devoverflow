import { nFormatter } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}
const StatsCard = (props: StatsCardProps) => {
  const { imgUrl, title, value } = props;
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className="paragraph-semibold text-dark200_light900">
          {nFormatter(value, 0)}
        </p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
