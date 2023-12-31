import QuestionCard from "@/components/cards/QuestionCard";
import PageHeader from "@/components/layout/PageHeader";
import NoResult from "@/components/shared/NoResult";
import { Pagination } from "@/components/shared/Pagination";
import { QuestionFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import { getQuestionByTagId } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";
import { Question } from "@/types/database";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

export async function generateMetadata(
  { params, searchParams }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { tagTitle } = await getQuestionByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q,
  });

  return {
    title: `${tagTitle || "Тег"} — devOverflow`,
  };
}

const TagDetailsPage = async (props: URLProps) => {
  const { params, searchParams } = props;
  const { tagTitle, questions, isNext } = await getQuestionByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
        <PageHeader
          title={tagTitle}
          search={{
            placeholder: "Поиск вопросов по тегу",
            href: `${PATHS.TAGS}/${params.id}`,
          }}
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
            description="Попробуйты выбрать другой тег или повторить попытку позже."
            linkUrl={PATHS.TAGS}
            linkText="К тегам"
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

export default TagDetailsPage;
