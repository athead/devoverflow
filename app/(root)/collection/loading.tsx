import PageHeader from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="mt-10 flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader title="Сохраненные вопросы" />
      </div>
      <div className="mb-12 mt-6 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>
      <div className="flex flex-wrap gap-6">
        {[...Array(10)].map((_, item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
