import QuestionCard from "@/components/cards/QuestionCard";
import PageHeader from "@/components/layout/PageHeader";
import NoResult from "@/components/shared/NoResult";
import { Pagination } from "@/components/shared/Pagination";
import { QuestionFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import { getUserCollection } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { Question } from "@/types/database";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Избранное — devOverflow",
};

const CollectionPage = async (props: SearchParamsProps) => {
  const { userId } = auth();
  const { searchParams } = props;
  if (!userId) redirect(PATHS.SIGN_IN);

  const { questions, isNext } = await getUserCollection({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <div className="flex w-full flex-col gap-6">
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
          questions.map((question: Question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
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
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default CollectionPage;
