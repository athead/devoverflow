import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: "1",
    title: "Cascading Deletes is SQLAlchemy?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: { _id: "1", name: "John Doe", avatar: "test.png" },
    upvotes: 13451111,
    views: 1012,
    answers: [],
    createdAt: new Date("2022-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "Do ya have som Machine Learning?",
    tags: [
      { _id: "3", name: "JS" },
      { _id: "4", name: "ML" },
    ],
    author: { _id: "2", name: "John Cena", avatar: "test.png" },
    upvotes: 153,
    views: 23611,
    answers: [],
    createdAt: new Date("2022-08-01T12:00:00.000Z"),
  },
];
const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Все вопросы</h1>
        <Link className="flex justify-end max-sm:w-full" href="/ask-question">
          <Button size={"lg"} variant={"lightGradient"}>
            Задать вопрос
          </Button>
        </Link>
      </div>
      <div className="mt-8 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Поиск вопросов"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
          placeholder="Выберите фильтр"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
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
            linkUrl="/ask-question"
            linkText="Задать вопрос"
          />
        )}
      </div>
    </>
  );
};

export default Home;
