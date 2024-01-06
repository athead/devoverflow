import SkeletonQuestionCard from "@/components/cards/QuestionCard/Skeleton";
import PageHeader from "@/components/layout/PageHeader";
import QuestionsList from "@/components/pages/QuestionsList";
import { HomePageFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Главная — devOverflow",
  description:
    "devOverflow это открытое сообщество разработчиков. Присоединяйся!",
};

const Home = async (props: SearchParamsProps) => {
  const { searchParams } = props;
  const params = props.searchParams;
  const keyString = `${params.q}${params.page}`;
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
        <Suspense
          key={keyString}
          fallback={
            <div className="flex flex-col gap-6">
              {[...Array(4)].map((_, item) => (
                <SkeletonQuestionCard key={item} />
              ))}
            </div>
          }
        >
          <QuestionsList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
