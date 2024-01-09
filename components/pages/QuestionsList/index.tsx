import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { Pagination } from "@/components/shared/Pagination";
import { HomePageFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { clearHtmlCode } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import { Question } from "@/types/database";
import { auth } from "@clerk/nextjs";
import React from "react";

const QuestionsList = async (props: SearchParamsProps) => {
  const { searchParams } = props;
  const { userId } = auth();

  let questions: Question[] = [];
  let isNext: boolean = false;
  if (searchParams?.filter === HomePageFilters[3].value) {
    // if recommended
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
      {questions.length > 0 ? (
        questions.map((question) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            createdAt={question.createdAt}
            views={question.views}
            upvotes={question.numberOfUpvotes}
            answers={question.numberOfAnswers}
            description={clearHtmlCode(question.content).substring(0, 400)}
          />
        ))
      ) : (
        <NoResult
          title="По Вашему запросу ничего не найдено"
          description="Вы можете задать вопрос и запустить обсуждение. Ваш
          вопрос может оказаться для кого-то отправной точкой стремительного
          развития. 🚀"
          linkUrl={PATHS.ASK_QUESTION}
          linkText="Задать вопрос"
        />
      )}
      <div className="mt-4">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default QuestionsList;
