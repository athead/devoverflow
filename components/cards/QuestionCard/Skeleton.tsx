import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonQuestionCard = () => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-9/12 rounded-md" />
        <Skeleton className="h-3 w-3/12 rounded-md" />
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-12 rounded-md" />
      </div>
      <div className="flex-between mt-3 w-full flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonQuestionCard;
