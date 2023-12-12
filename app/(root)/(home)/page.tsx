import QuestionCard from "@/components/cards/QuestionCard";
import PageHeader from "@/components/layout/PageHeader";
import NoResult from "@/components/shared/NoResult";
import { HomePageFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import { getQuestions } from "@/lib/actions/question.action";
import React from "react";

const Home = async () => {
  const { questions } = await getQuestions({});
  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
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
              key={JSON.stringify(question._id)}
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
    </>
  );
};

export default Home;
