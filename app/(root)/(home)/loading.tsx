import PageHeader from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { PATHS } from "@/constants/paths";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="mt-10 flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader
          title="Все вопросы"
          button={{ title: "Задать вопрос", href: PATHS.ASK_QUESTION }}
        />
      </div>
      <div className="mb-2 mt-6 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28" />
        </div>
      </div>
      <div className="my-5 hidden flex-wrap gap-6 md:flex">
        {[...Array(4)].map((_, item) => (
          <Skeleton key={item} className="h-9 w-40" />
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {[...Array(10)].map((_, item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
