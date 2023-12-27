import TagCard from "@/components/cards/TagCard";
import PageHeader from "@/components/layout/PageHeader";
import NoResult from "@/components/shared/NoResult";
import { TagFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import { getAllTags } from "@/lib/actions/tag.actions";
import React from "react";

const TagsPage = async () => {
  const { tags } = await getAllTags({});
  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
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
    </>
  );
};

export default TagsPage;