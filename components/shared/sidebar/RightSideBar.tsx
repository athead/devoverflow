import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";

const hotQuestions = [
  {
    _id: 1,
    title:
      "Как использовать JavaScript в повседневной жизни или поиск работы навсегда",
  },
  {
    _id: 2,
    title:
      "Как использовать JavaScript в повседневной жизни или поиск работы навсегда",
  },
  {
    _id: 3,
    title:
      "Как использовать JavaScript в повседневной жизни или поиск работы навсегда",
  },
  {
    _id: 4,
    title:
      "Как использовать JavaScript в повседневной жизни или поиск работы навсегда",
  },
  {
    _id: 5,
    title:
      "Как использовать JavaScript в повседневной жизни или поиск работы навсегда",
  },
];

const popularTags = [
  { _id: 1, name: "JavaScript", totalQuestions: 5 },
  { _id: 2, name: "React", totalQuestions: 10 },
  { _id: 3, name: "Next", totalQuestions: 2 },
  { _id: 4, name: "Vue", totalQuestions: 1 },
  { _id: 5, name: "Redux", totalQuestions: 2 },
];

const RightSideBar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Популярные вопросы</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="go to"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Популярные теги</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
