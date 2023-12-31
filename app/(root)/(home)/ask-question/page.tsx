import QuestionForm from "@/components/forms/QuestionForm";
import { PATHS } from "@/constants/paths";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const AskQuestion = async () => {
  const { userId } = auth();

  if (!userId) redirect(PATHS.SIGN_IN);

  const user = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Задать вопрос</h1>
      <div className="mt-9">
        <QuestionForm userId={JSON.stringify(user!._id)} formType="create" />
      </div>
    </div>
  );
};

export default AskQuestion;
