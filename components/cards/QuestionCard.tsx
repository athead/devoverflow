import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { timeDifferenceStringFromNow } from "@/lib/utils";
// import { Types } from "mongoose";

export type Tag = {
  _id: string;
  name: string;
};

// export type User = {
//   _id: Types.ObjectId;
//   name: string;
//   avatar: string;
// };

interface QuestionCardProps {
  _id: string;
  title: string;
  tags: string;
  author: string;
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { _id, answers, author, createdAt, tags, title, upvotes, views } =
    props;
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {timeDifferenceStringFromNow(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* Если залогигнен - показывать кнопки */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {/* TODO убрать any */}
        {JSON.parse(tags).map((tag: Tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgSrc={JSON.parse(author).avatar}
          alt="User"
          value={JSON.parse(author).name}
          title={` - ${timeDifferenceStringFromNow(createdAt)}`}
          href={`/profile/${JSON.parse(author)._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgSrc="/assets/icons/like.svg"
          alt="upvotes"
          value={upvotes}
          namecases={["лайк", "лайка", "лайков"]}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgSrc="/assets/icons/message.svg"
          alt="answers"
          value={answers.length}
          namecases={["ответ", "ответа", "ответов"]}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgSrc="/assets/icons/eye.svg"
          alt="views"
          value={views}
          namecases={["просмотр", "просмотра", "просмотров"]}
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
