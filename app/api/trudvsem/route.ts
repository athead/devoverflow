import { NextResponse } from "next/server";

export const POST = async (requst: Request) => {
  const {
    text,
    page = 1,
    regionCode,
    accommodation,
    salary,
    busyType,
    pageSize = 20,
  } = await requst.json();

  const skipAmount = (page - 1) * pageSize;

  const isParams =
    text || page || regionCode || salary || busyType || accommodation;
  let query = "https://opendata.trudvsem.ru/api/v1/vacancies";
  if (regionCode) query = query + `/region/${regionCode}`;
  if (isParams) query = query + "?";
  if (text) query = `${query}text=${text}&`;
  if (page) query = `${query}offset=${skipAmount}&limit=${pageSize}`;
  console.log(query);
  try {
    const response = await fetch(query, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    const responseData = await response.json();
    return NextResponse.json({
      total: responseData.meta.total,
      vacancies: responseData.results.vacancies,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message });
  }
};
