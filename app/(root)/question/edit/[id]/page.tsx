import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Редактировать вопрос — devOverflow",
};

const EditQuestionPage = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const user = await getUserById({ userId });
  const question = await getQuestionById({ questionId: params.id });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Редактировать вопрос</h1>
      <div className="mt-9">
        <QuestionForm
          formType="edit"
          userId={JSON.stringify(user._id)}
          questionDetails={JSON.stringify(question)}
        />
      </div>
    </>
  );
};

export default EditQuestionPage;
