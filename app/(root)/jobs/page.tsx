// import JobFilters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";

import { getCountryFilters, getJobs } from "@/lib/actions/job.action";

import { JobPageFilters } from "@/constants/filters";

import type { SearchParamsProps } from "@/types";
import type { Metadata } from "next";
import { PATHS } from "@/constants/paths";
import PageHeader from "@/components/layout/PageHeader";
import { Pagination } from "@/components/shared/Pagination";
import JobCard from "@/components/cards/JobCard";
import JobFilters from "@/components/shared/filters/JobFilter";

export const metadata: Metadata = {
  title: "Вакансии — devOverflow",
};

const JobsPage = async ({ searchParams }: SearchParamsProps) => {
  const CountryFilters = await getCountryFilters();

  const { jobs, isNext, totalLength } = await getJobs({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    location: searchParams.location,
    remote: searchParams.remote,
    page: searchParams.page ? +searchParams.page : 1,
    wage: searchParams.wage,
    skills: searchParams.skills,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Вакансии"
          search={{
            placeholder: "Название, компания или ключевые слова",
            href: PATHS.HOME,
          }}
          filter={{
            type: "secondary",
            values: CountryFilters,
            default: CountryFilters[0],
            placeholder: "Страна",
          }}
        />

        <JobFilters filters={JobPageFilters} />

        <div className="flex w-full flex-col gap-6">
          {jobs.length > 0 ? (
            jobs.map((jobItem: any) => (
              <JobCard
                key={jobItem.job_id}
                title={jobItem.job_title}
                description={jobItem.job_description}
                city={jobItem.job_city}
                state={jobItem.job_state}
                country={jobItem.job_country}
                requiredSkills={jobItem.job_required_skills?.slice(0, 5) || []}
                applyLink={jobItem.job_apply_link}
                employerLogo={jobItem.employer_logo}
                employerName={jobItem.employer_name}
                employerWebsite={jobItem.employer_website}
                employmentType={jobItem.job_employment_type?.toLowerCase()}
                isRemote={jobItem.job_is_remote}
                salary={{
                  min: jobItem.job_min_salary,
                  max: jobItem.job_max_salary,
                  currency: jobItem.job_salary_currency,
                  period: jobItem.job_salary_period,
                }}
                postedAt={jobItem.job_posted_at_datetime_utc}
              />
            ))
          ) : (
            <NoResult
              title="Не найдено вакансий"
              description="Мы не можем найти вакансии по вашему запросу 🤔"
              linkUrl={PATHS.JOBS}
              linkText="Без фильтров"
            />
          )}
        </div>
        {totalLength > 0 && (
          <div className="mt-10">
            <Pagination
              pageNumber={searchParams?.page ? +searchParams.page : 1}
              isNext={isNext}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default JobsPage;
