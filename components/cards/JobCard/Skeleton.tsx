import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonJobCard = () => {
  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="flex w-full flex-col gap-3 p-6">
        <div className="flex w-full flex-row justify-between">
          <Skeleton className="h-7 w-80 rounded-md" />
          <Skeleton className="h-7 w-36 rounded-xl" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-7/12 rounded-md" />
          <Skeleton className="h-5 w-9/12 rounded-md" />
          <Skeleton className="h-5 w-5/12 rounded-md" />
        </div>

        <div className="flex-between w-full flex-wrap gap-3">
          <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonJobCard;
