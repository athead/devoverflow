import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const AskQuestion = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Задать вопрос</h1>
      <div>
        <QuestionForm userId={JSON.stringify(user!._id)} formType="create" />
      </div>
    </div>
  );
};

export default AskQuestion;
