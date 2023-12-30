import PageHeader from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <PageHeader title="Сообщество" />

      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>

      <div className="my-10">
        <div className="hidden flex-wrap gap-3 md:flex">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="mt-2">
          <Skeleton className="h-9 w-72" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {[...Array(10)].map((_, item) => (
          <Skeleton key={item} className="h-52 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
