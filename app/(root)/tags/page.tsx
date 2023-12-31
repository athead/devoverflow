import TagCard from "@/components/cards/TagCard";
import PageHeader from "@/components/layout/PageHeader";
import NoResult from "@/components/shared/NoResult";
import { Pagination } from "@/components/shared/Pagination";
import { TagFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import { getAllTags } from "@/lib/actions/tag.actions";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Теги — devOverflow",
};

const TagsPage = async (props: SearchParamsProps) => {
  const { searchParams } = props;

  const { tags, isNext } = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Теги"
          search={{ placeholder: "Поиск тегов", href: PATHS.TAGS }}
          filter={{
            type: "secondary",
            values: TagFilters,
            default: TagFilters[0],
            placeholder: "Фильтр",
          }}
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <TagCard
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              description={tag.description}
              questionLength={tag.questions.length}
            />
          ))
        ) : (
          <NoResult
            title="Тегов не найдено"
            description=""
            linkUrl={PATHS.SIGN_UP}
            linkText="Задать вопрос"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default TagsPage;
