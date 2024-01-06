import SkeletonJobCard from "@/components/cards/JobCard/Skeleton";
import PageHeader from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader title="Вакансии" />
      </div>
      <div className="flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1 rounded-xl" />
        <Skeleton className="h-14 w-32 rounded-xl" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
      <div className="flex w-full justify-end">
        <Skeleton className="h-7 w-40 rounded-xl" />
      </div>
      <div className="flex flex-col gap-6">
        {[...Array(10)].map((_, item) => (
          <SkeletonJobCard key={item} />
        ))}
      </div>
    </section>
  );
};

export default Loading;
