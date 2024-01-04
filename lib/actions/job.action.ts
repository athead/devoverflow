import { readFileSync } from "fs";
import path from "path";
import type { GetJobsParams } from "./shares.types";

interface RegionType {
  name: string;
  code: number;
  order: number;
}

// let _jsearch: any;
let _countries: any;
let _regions: RegionType[];

// export async function getJobs(params: GetJobsParams) {
//   try {
//     const {
//       page = 1,
//       pageSize = 10,
//       filter,
//       location,
//       remote,
//       wage,
//       skills,
//       searchQuery,
//     } = params;

//     // Calculate the number of jobs to skip based on the page number and page size
//     const skipAmount = (page - 1) * pageSize;

//     if (!_jsearch) {
//       const file = path.join(process.cwd(), "content", "jsearch.json");
//       const fileSync = readFileSync(file, "utf8");

//       const jsonData = JSON.parse(fileSync);

//       _jsearch = jsonData;
//     }

//     const allJobs = _jsearch.data || [];

//     const searchQueryRegExp = new RegExp(
//       (searchQuery || "").toLowerCase(),
//       "i"
//     );
//     const locationRegExp = new RegExp((location || "").toLowerCase(), "i");

//     const filteredJobs = allJobs.filter((job: any) => {
//       return (
//         job &&
//         searchQueryRegExp.test(job.job_title) &&
//         locationRegExp.test(job.job_country) &&
//         (!remote || job.job_is_remote === true) &&
//         (!wage ||
//           (job.job_min_salary !== null && job.job_max_salary !== null)) &&
//         (!skills || job.job_required_skills)
//       );
//     });

//     let filterOptions = {
//       job_employment_type: "",
//     };

//     switch (filter) {
//       case "fulltime":
//         filterOptions = { job_employment_type: "FULLTIME" };
//         break;
//       case "parttime":
//         filterOptions = { job_employment_type: "PARTTIME" };
//         break;
//       case "contractor":
//         filterOptions = { job_employment_type: "CONTRACTOR" };
//         break;
//       case "intern":
//         filterOptions = { job_employment_type: "INTERN" };
//         break;
//       default:
//         filterOptions = { job_employment_type: "" };
//         break;
//     }

//     const data = filteredJobs
//       .filter((job: any) =>
//         filterOptions.job_employment_type !== ""
//           ? job.job_employment_type === filterOptions.job_employment_type
//           : true
//       )
//       .slice(skipAmount, skipAmount + pageSize);

//     const totalLength = filteredJobs.filter((job: any) =>
//       filterOptions.job_employment_type !== ""
//         ? job.job_employment_type === filterOptions.job_employment_type
//         : true
//     ).length;

//     const totalJobs = allJobs.length;

//     const isNext = totalJobs > skipAmount + data.length;

//     return { jobs: data, isNext, totalLength };
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
export async function getJobs(params: GetJobsParams) {
  const {
    title,
    titleType = '["VACANCY_NAME"]',
    busyType,
    regionCode,
    salaryMax = 999999,
    salaryMin = 0,
    scheduleType,
    order = "RELEVANCE_DESC", // RELEVANCE_DESC
    page = 1,
    pageSize = 10,
  } = params;
  try {
    const query =
      "https://" +
      encodeURI(
        `trudvsem.ru/iblocks/_catalog/flat_filter_prr_search_vacancies/data?filter={"titleType":${titleType}${
          title ? `,"title":"${title}"` : ``
        }${regionCode ? `,"regionCode":${regionCode}` : ``}${
          scheduleType ? `,"scheduleType":${scheduleType}` : ``
        }${
          busyType ? `,"busyType":${busyType}` : ``
        },"salary":["${salaryMin}","${salaryMax}"]}&orderColumn=${order}&page=${
          page - 1
        }&pageSize=${pageSize}`
      )
        .replace(/:/g, "%3A")
        .replace(/,/g, "%2C");
    // return { jobs: [], total: 0, isNext: false };
    // eslint-disable-next-line
    const response = await fetch(query);
    const { result } = await response.json();
    const vacancies = [];

    for (const vacancy of result.data) {
      const query = encodeURI(
        `https://trudvsem.ru/iblocks/job_card?companyId=${vacancy[2]}&vacancyId=${vacancy[0]}`
      );
      const response = await fetch(query);
      const { data } = await response.json();
      vacancies.push({
        id: vacancy[0],
        companyId: vacancy[2],
        ...data.vacancy,
      });
    }
    console.log(result.paging);
    return {
      jobs: vacancies,
      total: result.paging.total,
      isNext: page < result.paging.pages,
      totalPages: result.paging.pages,
    };
  } catch (error) {
    console.log(error);
    return { jobs: [], total: 0, isNext: false, totalPages: 0 };
  }
}

export async function getCountryFilters() {
  try {
    if (!_countries) {
      const file = path.join(process.cwd(), "content", "countries_ru.json");
      const fileSync = readFileSync(file, "utf8");

      const jsonData = JSON.parse(fileSync);

      _countries = jsonData;
    }

    const result = _countries.map((country: any) => ({
      name: country.name,
      value: country.cca2,
    }));

    return result;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function getRegionFilters() {
  try {
    if (!_regions) {
      const file = path.join(process.cwd(), "content", "regions_ru.json");
      const fileSync = readFileSync(file, "utf8");

      const jsonData = JSON.parse(fileSync);

      _regions = jsonData;
    }

    const result = _regions
      .map((region: RegionType) => ({
        name: region.name,
        value: String(region.code),
        order: region.order,
      }))
      .sort((a, b) => a.order - b.order);

    return result;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
