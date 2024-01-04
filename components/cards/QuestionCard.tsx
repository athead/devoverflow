import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { timeDifferenceStringFromNow } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";
import { Tag, User } from "@/types/database";

interface QuestionCardProps {
  _id: string;
  title: string;
  tags: Tag[];
  author: User;
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = (props: QuestionCardProps) => {
  const {
    _id,
    answers,
    author,
    createdAt,
    tags,
    title,
    upvotes,
    views,
    clerkId,
  } = props;
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {timeDifferenceStringFromNow(createdAt)}
          </span>
        </div>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgSrc={author.avatar}
          alt="User"
          value={author.name}
          title={` — ${timeDifferenceStringFromNow(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
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
    </div>
  );
};

export default QuestionCard;
