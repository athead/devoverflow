import {
  JobBusyTypeFilters,
  JobScheduleTypeFilters,
  RegionFilters,
} from "@/constants/filters";

import type { SearchParamsProps } from "@/types";
import { PATHS } from "@/constants/paths";
import PageHeader from "@/components/layout/PageHeader";
import { Metadata } from "next";
import { Option } from "@/components/shared/ui/MultipleSelector";
import MultiSelect from "@/components/shared/filters/MultiSelect";
import { Suspense } from "react";
import JobsPageList from "@/components/pages/JobsList";
import SkeletonJobCard from "@/components/cards/JobCard/Skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Поиск вакансий — devOverflow",
};

const JobsPage = async (props: SearchParamsProps) => {
  const { searchParams } = props;
  const params = props.searchParams;
  const keyString = `${params.title}${params.regionCode}${params.page}${params.busyType}${params.scheduleType}`;
  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title="Вакансии"
        search={{
          placeholder: "Название вакансии",
          href: PATHS.JOBS,
          searchParamsKey: "title",
          debounce: 800,
        }}
        filter={{
          type: "secondary",
          values: RegionFilters,
          default: RegionFilters[0],
          searchParamsKey: "regionCode",
          placeholder: "Регион",
        }}
      />
      <div className="flex flex-col gap-4">
        <MultiSelect
          options={JobScheduleTypeFilters as Option[]}
          placeholder="График работы"
          paramKey="scheduleType"
          route={PATHS.JOBS}
        />
        <MultiSelect
          options={JobBusyTypeFilters as Option[]}
          placeholder="Тип занятости"
          paramKey="busyType"
          route={PATHS.JOBS}
        />
      </div>

      <Suspense
        key={keyString}
        fallback={
          <>
            <div className="flex w-full justify-end">
              <Skeleton className="h-7 w-40 rounded-xl" />
            </div>
            <div className="flex flex-col gap-6">
              {[...Array(4)].map((_, item) => (
                <SkeletonJobCard key={item} />
              ))}
            </div>
          </>
        }
      >
        <JobsPageList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default JobsPage;
