import QuestionCard from "@/components/cards/QuestionCard";
import PageHeader from "@/components/layout/PageHeader";
import NoResult from "@/components/shared/NoResult";
import { Pagination } from "@/components/shared/Pagination";
import { HomePageFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import { Question } from "@/types/database";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Главная — devOverflow",
  description:
    "devOverflow это открытое сообщество разработчиков. Присоединяйся!",
};
const Home = async (props: SearchParamsProps) => {
  const { searchParams } = props;
  const { userId } = auth();

  let questions: Question[] = [];
  let isNext: boolean = false;
  // if recommended
  if (searchParams?.filter === HomePageFilters[3].value) {
    if (userId) {
      const result = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
      });
      questions = result.questions as Question[];
      isNext = result.isNext;
    } else {
      questions = [];
      isNext = false;
    }
  } else {
    const result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
    questions = result.questions as Question[];
    isNext = result.isNext;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Все вопросы"
          button={{ title: "Задать вопрос", href: PATHS.ASK_QUESTION }}
          search={{ placeholder: "Поиск вопросов", href: PATHS.HOME }}
          filter={{
            type: "primary",
            values: HomePageFilters,
            default: HomePageFilters[0],
            placeholder: "Выберите фильтр",
          }}
        />
        {questions.length > 0 ? (
          questions.map((question) => (
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
            description="Будь первым, кто прирвет тишину! Задай вопрос и запусти обсуждение. Твой
          вопрос может оказаться для кого-то отправной точкой стремительного
          развития."
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

export default Home;
