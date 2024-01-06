import JobCard from "@/components/cards/JobCard";
import NoResult from "@/components/shared/NoResult";
import { Pagination } from "@/components/shared/Pagination";
import { PATHS } from "@/constants/paths";
import { getJobs } from "@/lib/actions/job.action";
import {
  capitalizeFirstLetter,
  clearJobDescription,
  getNumberNamecasesString,
} from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import { Vacancy } from "@/types/job";
import React from "react";

const JobsPageList = async (props: SearchParamsProps) => {
  const { searchParams } = props;
  const {
    jobs: vacancies,
    total: totalVacancies,
    totalPages,
    isNext,
  }: {
    jobs: Vacancy[];
    total: number;
    totalPages: number;
    isNext: boolean;
  } = await getJobs({
    title: searchParams.title,
    regionCode: searchParams.regionCode,
    page: searchParams.page ? +searchParams.page : 1,
    busyType: searchParams.busyType,
    scheduleType: searchParams.scheduleType,
  });

  return (
    <>
      <div className="flex w-full justify-end">
        <p className="text-dark100_light900 opacity-50">
          Найдено {totalVacancies}{" "}
          {getNumberNamecasesString(
            totalVacancies,
            ["вакансий", "вакансии", "вакансий"],
            false
          )}
        </p>
      </div>
      <div className="flex w-full flex-col gap-6">
        {vacancies.length > 0 ? (
          vacancies.map((vacancy) => (
            <JobCard
              key={vacancy.id}
              title={capitalizeFirstLetter(vacancy.vacancyName)}
              description={clearJobDescription(
                vacancy.positionResponsibilities
              )}
              location={vacancy.stateRegion}
              metro={vacancy.metro}
              employment={vacancy.sourceType}
              employerName={
                vacancy.irdata?.companyName || vacancy.companyDTO.name
              }
              schedule={vacancy.scheduleType}
              salaryMin={vacancy.salaryMin}
              salaryMax={vacancy.salaryMax}
              link={`https://trudvsem.ru/vacancy/card/${vacancy.companyId}/${vacancy.id}`}
              createdAt={new Date(vacancy.publishedDate)}
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
      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={isNext}
          />
        </div>
      )}
    </>
  );
};

export default JobsPageList;
