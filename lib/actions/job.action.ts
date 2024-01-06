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
