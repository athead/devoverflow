import Link from "next/link";

import { SignedIn } from "@clerk/nextjs";

import Metric from "@/components/shared/Metric";
import EditDeleteAction from "@/components/shared/EditDeleteAction";

import { timeDifferenceStringFromNow } from "@/lib/utils";

interface AnswerCardProps {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    avatar: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = (props: AnswerCardProps) => {
  const { clerkId, _id, question, author, upvotes, createdAt } = props;
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {timeDifferenceStringFromNow(createdAt)}
          </span>
        </div>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgSrc={author.avatar}
          alt="user avatar"
          value={author.name}
          title={` • ${timeDifferenceStringFromNow(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            imgSrc="/assets/icons/like.svg"
            alt="upvotes"
            value={upvotes}
            namecases={["лайк", "лайка", "лайков"]}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
