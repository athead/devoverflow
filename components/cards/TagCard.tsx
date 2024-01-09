import { PATHS } from "@/constants/paths";
import { getNumberNamecasesString } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface TagCardProps {
  _id: string;
  name: string;
  description: string;
  questionLength: number;
}

const TagCard = (props: TagCardProps) => {
  const { _id, name, description, questionLength } = props;
  return (
    <Link href={`${PATHS.TAGS}/${_id}`} className="shadow-light100_darknone w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333333%-0.666666rem)]">
      {/* sm:w-[260px] */}
      <article className="background-light900_dark200 light-border flex flex-col rounded-xl border px-6 py-8"> 
        <div className="background-light800_dark400 w-fit rounded px-5 py-1.5">
          <p className="paragraph-semibold text-dark300_light900">{name}</p>
        </div>
        {description && (
          <p className="small-regular text-dark500_light700 mt-4 line-clamp-3 lg:line-clamp-4">
            {description}
          </p>
        )}
        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {questionLength}
          </span>
          {getNumberNamecasesString(
            questionLength,
            ["вопрос", "вопроса", "вопросов"],
            false
          )}
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
