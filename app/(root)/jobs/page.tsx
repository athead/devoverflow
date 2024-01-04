// "use client";
// import JobFilters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import {
  JobBusyTypeFilters,
  JobScheduleTypeFilters,
  RegionFilters,
} from "@/constants/filters";

import type { SearchParamsProps } from "@/types";
import { PATHS } from "@/constants/paths";
import PageHeader from "@/components/layout/PageHeader";
import { Pagination } from "@/components/shared/Pagination";
import JobCard from "@/components/cards/JobCard";
import {
  capitalizeFirstLetter,
  clearJobDescription,
  getNumberNamecasesString,
} from "@/lib/utils";
import { Vacancy } from "@/types/job";
import { Metadata } from "next";
import { getJobs } from "@/lib/actions/job.action";
import { Option } from "@/components/shared/ui/MultipleSelector";
import MultiSelect from "@/components/shared/filters/MultiSelect";

export const metadata: Metadata = {
  title: "Поиск вакансий — devOverflow",
};

const JobsPage = async (props: SearchParamsProps) => {
  const { searchParams } = props;
  const {
    jobs,
    total: jobsCount,
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
  // const [isLoading, setIsLoading] = useState(false);
  // const [jobsText, setJobsText] = useState("");
  // const [jobsRegionCode, setJobsRegionCode] = useState("");
  // // TODO сделать типизацию
  // const [jobs, setJobs] = useState([]);
  // const [jobsCount, setJobsCount] = useState(0);
  // const CountryFilters = await getCountryFilters();
  // const { jobs, isNext, totalLength } = await getJobs({
  //   searchQuery: searchParams.q,
  //   filter: searchParams.filter,
  //   location: searchParams.location,
  //   remote: searchParams.remote,
  //   page: searchParams.page ? +searchParams.page : 1,
  //   wage: searchParams.wage,
  //   skills: searchParams.skills,
  // });

  // useEffect(() => {
  //   async function fetchData() {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trudvsem`,
  //         {
  //           method: "POST",
  //           body: JSON.stringify({
  //             text: jobsText,
  //             regionCode: jobsRegionCode,
  //             page: searchParams?.page,
  //           }),
  //         }
  //       );
  //       const { total, vacancies } = await response.json();
  //       setJobs(vacancies);
  //       console.log(vacancies);
  //       setJobsCount(total);
  //     } catch (error) {
  //       setJobs([]);
  //       setJobsCount(0);
  //       toast({
  //         title: `Ошибка получения ответа от внешнего сервера`,
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, [jobsText, jobsRegionCode, searchParams?.page]);
  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Вакансии"
          search={{
            placeholder: "Название вакансии",
            href: PATHS.JOBS,
            searchParamsKey: "title",
            debounce: 800,
            // onChange: (text: string) => setJobsText(text),
          }}
          filter={{
            type: "secondary",
            values: RegionFilters,
            default: RegionFilters[0],
            searchParamsKey: "regionCode",
            placeholder: "Регион",
            // onChange: (value: string) => setJobsRegionCode(value),
          }}
        />

        <div className="flex flex-col gap-1">
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
        <div className="flex w-full justify-end">
          <p className="text-dark100_light900 opacity-50">
            Найдено {jobsCount}{" "}
            {getNumberNamecasesString(
              jobsCount,
              ["вакансий", "вакансии", "вакансий"],
              false
            )}
          </p>
        </div>
        <div className="flex w-full flex-col gap-6">
          {jobs.length > 0 ? (
            jobs.map((vacancy) => (
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
                  vacancy.irdata?.companyName || vacancy.companyDTO.legalForm
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
      </div>
    </>
  );
};

export default JobsPage;
