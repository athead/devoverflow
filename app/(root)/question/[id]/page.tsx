import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { PATHS } from "@/constants/paths";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { timeDifferenceStringFromNow } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const QuestionDetailsPage = async ({ params, searchParams }) => {
  const questionDetails = await getQuestionById({
    questionId: params.id,
  });
  const { userId: clerkId } = auth();
  let user;
  if (clerkId) {
    user = await getUserById({ userId: clerkId });
  }

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
              alt="avatar"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {questionDetails.author.name}
            </p>
          </Link>
          <div className="flex justify-end">VOTING</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {questionDetails.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgSrc="/assets/icons/clock.svg"
          alt="clock"
          value={`Создан ${timeDifferenceStringFromNow(
            questionDetails.createdAt
          )}`}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgSrc="/assets/icons/message.svg"
          alt="answers"
          value={questionDetails.answers.length}
          namecases={["ответ", "ответа", "ответов"]}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgSrc="/assets/icons/eye.svg"
          alt="views"
          value={questionDetails.views}
          namecases={["просмотр", "просмотра", "просмотров"]}
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={questionDetails.content} />
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
      <AllAnswers
        questionId={questionDetails._id}
        userId={JSON.stringify(user._id)}
        totalAnswers={questionDetails.answers.length}
      />
      <AnswerForm
        // question={questionDetails.content}
        questionId={JSON.stringify(questionDetails._id)}
        authorId={JSON.stringify(user._id)}
      />
    </>
  );
};

export default QuestionDetailsPage;
