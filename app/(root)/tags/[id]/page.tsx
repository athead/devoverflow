import QuestionCard from "@/components/cards/QuestionCard";
import PageHeader from "@/components/layout/PageHeader";
import NoResult from "@/components/shared/NoResult";
import { QuestionFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import { getQuestionByTagId } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";
import React from "react";

const TagDetailsPage = async (props: URLProps) => {
  const { params, searchParams } = props;
  const { tagTitle, questions } = await getQuestionByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
        <PageHeader
          title={tagTitle}
          //   TODO поправить путь
          search={{ placeholder: "Поиск вопросов по тегу", href: PATHS.TAGS }}
          filter={{
            type: "primary",
            values: QuestionFilters,
            default: QuestionFilters[0],
            placeholder: "Выберите фильтр",
          }}
        />
        {questions.length > 0 ? (
          //   TODO добавить тип
          questions.map((question: any) => (
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
    </>
  );
};

export default TagDetailsPage;
