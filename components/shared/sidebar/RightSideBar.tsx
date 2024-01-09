import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { PATHS } from "@/constants/paths";
import { getPopularTags } from "@/lib/actions/tag.actions";
import { Question, Tag } from "@/types/database";

const RightSideBar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getPopularTags();
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-32 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Популярные вопросы</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question: Question) => (
            <Link
              href={`${PATHS.QUESTION}/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700 line-clamp-2">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="go to"
                width={20}
                height={20}
                style={{ width: "20px", height: "20px" }}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h3 className="h3-bold text-dark200_light900">Популярные метки</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag: Tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
