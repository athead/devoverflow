import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import SyntaxHighlighter from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { PATHS } from "@/constants/paths";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { timeDifferenceStringFromNow } from "@/lib/utils";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateMetadata(
  { params, searchParams }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { userId: clerkId } = auth();
  let user;
  if (clerkId) {
    user = await getUserById({ userId: clerkId });
  }
  const questionDetails = await getQuestionById({
    questionId: params.id,
    userId: user?._id,
  });

  return {
    title: `${questionDetails.title || "Вопросы"} — devOverflow`,
  };
}

const QuestionDetailsPage = async (props: URLProps) => {
  const { params, searchParams } = props;
  const { userId: clerkId } = auth();
  let user;
  if (clerkId) {
    user = await getUserById({ userId: clerkId });
  }

  const questionDetails = await getQuestionById({
    questionId: params.id,
    userId: user?._id,
  });

  if (!questionDetails) return <div>Ошибка получения вопроса</div>;
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`${PATHS.PROFILE}/${questionDetails.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={questionDetails.author.avatar}
              className="rounded-full"
              width={22}
              height={22}
              style={{ width: "22px", height: "22px" }}
              alt="avatar"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {questionDetails.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(questionDetails._id)}
              userId={JSON.stringify(user?._id)}
              upvotes={questionDetails.upvotes.length}
              hasUpVoted={questionDetails.upvotes.includes(user?._id)}
              downvotes={questionDetails.downvotes.length}
              hasDownVoted={questionDetails.downvotes.includes(user?._id)}
              hasSaved={user?.saved.includes(questionDetails._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {questionDetails.title}
        </h2>
      </div>
      <div className="mb-5 mt-3 flex flex-wrap gap-4">
        <Metric
          imgSrc="/assets/icons/clock.svg"
          alt="clock"
          value={`cоздан ${timeDifferenceStringFromNow(
            questionDetails.createdAt
          )}`}
          textStyles="small-regular text-dark400_light800"
        />
        <Metric
          imgSrc="/assets/icons/message.svg"
          alt="answers"
          value={questionDetails.answers.length}
          namecases={["ответ", "ответа", "ответов"]}
          textStyles="small-regular text-dark400_light800"
        />
        <Metric
          imgSrc="/assets/icons/eye.svg"
          alt="views"
          value={questionDetails.views}
          namecases={["просмотр", "просмотра", "просмотров"]}
          textStyles="small-regular text-dark400_light800"
        />
      </div>
      <SyntaxHighlighter code={questionDetails.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {questionDetails.tags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      {questionDetails.answers.length > 0 ? (
        <AllAnswers
          questionId={questionDetails._id}
          userId={user?._id}
          totalAnswers={questionDetails.answers.length}
          page={searchParams?.page}
          filter={searchParams?.filter}
        />
      ) : (
        <div className="my-6">
          <div className="flex items-center justify-between">
            <h3 className="primary-text-gradient">Ответов пока нет</h3>
          </div>
        </div>
      )}
      <AnswerForm
        question={questionDetails.content}
        questionId={JSON.stringify(questionDetails._id)}
        authorId={JSON.stringify(user?._id)}
      />
    </>
  );
};

export default QuestionDetailsPage;
