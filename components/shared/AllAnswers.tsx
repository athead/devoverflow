import React from "react";
import Filter from "./filters/Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import { PATHS } from "@/constants/paths";
import Image from "next/image";
import {
  timeDifferenceStringFromNow,
  getNumberNamecasesString,
} from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import { Pagination } from "./Pagination";

interface AllAnswersProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: string;
  filter?: string;
}
const AllAnswers = async (props: AllAnswersProps) => {
  const { questionId, userId, totalAnswers, page, filter } = props;
  const { answers, isNext } = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {getNumberNamecasesString(
            totalAnswers,
            ["ответ", "ответа", "ответов"],
            true
          )}
        </h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {answers.map((answer) => (
          <article key={answer._id} className="light-border border-b pt-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`${PATHS.PROFILE}/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.avatar}
                  width={18}
                  height={18}
                  style={{ width: "18px", height: "18px" }}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>
                  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                    <span className="max-sm:hidden"> — </span>
                    {timeDifferenceStringFromNow(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                <Votes
                  type="answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  hasUpVoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasDownVoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
