import PageHeader from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <PageHeader title="Метки" />

      <div className="mt-6 flex items-center justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-32 max-sm:w-full" />
      </div>

      <div className="mt-6 flex flex-wrap gap-4 md:mt-10">
        {[...Array(10)].map((_, item) => (
          <Skeleton
            key={item}
            className="h-60 w-full rounded-xl sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333333%-0.666666rem)]"
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
