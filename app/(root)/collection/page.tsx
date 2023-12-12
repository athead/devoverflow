import QuestionCard from "@/components/cards/QuestionCard";
import PageHeader from "@/components/layout/PageHeader";
import NoResult from "@/components/shared/NoResult";
import { QuestionFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import { getUserCollection } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const CollectionPage = async () => {
  const { userId } = auth();

  if (!userId) redirect(PATHS.SIGN_IN);

  const { questions } = await getUserCollection({ clerkId: userId });
  //   console.log(questions);
  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
        <PageHeader
          title="Сохраненные вопросы"
          search={{ placeholder: "Поиск вопросов", href: PATHS.COLLECTION }}
          filter={{
            type: "primary",
            values: QuestionFilters,
            default: QuestionFilters[0],
            placeholder: "Выберите фильтр",
          }}
        />
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={JSON.stringify(question._id)}
              _id={question._id}
              title={question.title}
              //   TODO добавить тип
              tags={JSON.stringify(question.tags)}
              //   TODO добавить тип
              author={JSON.stringify(question.author)}
              upvotes={question.upvotes.length}
              createdAt={question.createdAt}
              views={question.views}
              answers={question.answers}
            />
          ))
        ) : (
          <NoResult
            title="По Вашему запросу ничего не найдено"
            description="Откройте раздел с вопросами сообщества и добавьте его в избранное"
            linkUrl={PATHS.ASK_QUESTION}
            linkText="Задать вопрос"
          />
        )}
      </div>
    </>
  );
};

export default CollectionPage;
