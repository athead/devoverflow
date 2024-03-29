import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA, CURRENCY_NOTATIONS } from "@/constants";
import { BadgeCounts } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNumberNamecasesString = (
  num: number | string,
  namecases?: [string, string, string],
  withNum?: boolean
): string => {
  if (!namecases) return "";
  if (typeof num === "string") num = parseInt(num);
  let n = Math.abs(num);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return withNum ? `${num} ${namecases[2]}` : `${namecases[2]}`;
  }
  n %= 10;
  if (n === 1) {
    return withNum ? `${num} ${namecases[0]}` : `${namecases[0]}`;
  }
  if (n >= 2 && n <= 4) {
    return withNum ? `${num} ${namecases[1]}` : `${namecases[1]}`;
  }
  return withNum ? `${num} ${namecases[2]}` : `${namecases[2]}`;
};

export function capitalizeFirstLetter(inputString: string): string {
  if (inputString.length === 0) {
    return inputString;
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export const timeDifferenceStringFromNow = (previous: Date): string => {
  const current = new Date();
  return timeDifferenceString(current, previous);
};

export const timeDifferenceString = (current: Date, previous: Date): string => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current.getTime() - previous.getTime();
  // 10 сек
  if (elapsed < 60 * 1000) {
    return "только что";
  } else if (elapsed < msPerMinute) {
    return (
      Math.round(elapsed / 1000) +
      ` ${getNumberNamecasesString(Math.round(elapsed / 1000), [
        "секунда",
        "секунды",
        "секунд",
      ])} назад`
    );
  } else if (elapsed < msPerHour) {
    return (
      Math.round(elapsed / msPerMinute) +
      ` ${getNumberNamecasesString(Math.round(elapsed / msPerMinute), [
        "минута",
        "минуты",
        "минут",
      ])} назад`
    );
  } else if (elapsed < msPerDay) {
    return (
      Math.round(elapsed / msPerHour) +
      ` ${getNumberNamecasesString(Math.round(elapsed / msPerHour), [
        "час",
        "часа",
        "часов",
      ])} назад`
    );
  } else if (elapsed < msPerMonth) {
    return (
      // "примерно " +
      Math.round(elapsed / msPerDay) +
      ` ${getNumberNamecasesString(Math.round(elapsed / msPerDay), [
        "день",
        "дня",
        "дней",
      ])} назад`
    );
  } else if (elapsed < msPerYear) {
    return (
      // "примерно " +
      Math.round(elapsed / msPerMonth) +
      ` ${getNumberNamecasesString(Math.round(elapsed / msPerMonth), [
        "месяц",
        "месяца",
        "месяцев",
      ])} назад`
    );
  } else {
    return (
      // "примерно " +
      Math.round(elapsed / msPerYear) +
      ` ${getNumberNamecasesString(Math.round(elapsed / msPerYear), [
        "год",
        "года",
        "лет",
      ])} назад`
    );
  }
};

export const nFormatter = (num: number, digits: number): string => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "К" },
    { value: 1e6, symbol: "М" },
    { value: 1e9, symbol: "млрд" },
    { value: 1e12, symbol: "трлн" },
    { value: 1e15, symbol: "квдрл" },
    { value: 1e18, symbol: "квнтл" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  const space = num > 999999999 ? " " : "";
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + space + item.symbol
    : "0";
};

export function getJoinedMonthYear(date: Date): string {
  const months: string[] = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const monthIndex: number = date.getMonth();
  const year: number = date.getFullYear();

  const cyrillicDate: string = `На сайте с ${months[monthIndex]} ${year}`;

  return cyrillicDate;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({
  params,
  key,
  value,
}: UrlQueryParams): string => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keys: string[];
}

export const removeKeysFromQuery = ({
  params,
  keys,
}: RemoveUrlQueryParams): string => {
  const currentUrl = qs.parse(params);
  keys.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}
export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  const { criteria } = params;
  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];
    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level])
        badgeLevels[level as keyof BadgeCounts] += 1;
    });
  });
  return badgeCounts;
};

export const getFormattedSalary = (
  min: number,
  max: number,
  currency: string | null,
  format: boolean = true
) => {
  if (!min && !max) return null;

  const salaryInfo = {
    symbol: currency ? CURRENCY_NOTATIONS[currency] || "руб" : "",
    low: format ? salaryFormatter(min, 1) : min,
    high: format ? salaryFormatter(max, 1) : max,
  };

  const { symbol, low, high } = salaryInfo;
  let formattedSalary = "";
  if (low && !high) formattedSalary = `от ${low} ${symbol}`;
  else if (high && !low) formattedSalary = `до ${high} ${symbol}`;
  else if (low === high) formattedSalary = `${low} ${symbol}`;
  else formattedSalary = `${low} - ${high} ${symbol}`;
  return formattedSalary as string;
};

const salaryFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const lookupItem = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return lookupItem
    ? (num / lookupItem.value).toFixed(digits).replace(rx, "$1") +
        lookupItem.symbol
    : "0";
};
export function isValidImage(url: string) {
  return /\.(jpg|jpeg|png|webp||svg)$/.test(url);
}

export function clearHtmlCode(input: string): string {
  if (!input) return "";

  return input
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/✅/g, "")
    .replace(/&laquo;/g, '"')
    .replace(/&raquo;/g, '"')
    .replace(/&mdash;/g, "-")
    .replace(/&bull;/g, "")
    .replace(/&lt;/g, "'")
    .replace(/&gt;/g, "'")
    .replace(/\s\s+/g, " ")
    .trim();
}

export function formatDateFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function formatTagString(inputString: string): string {
  // Используем регулярное выражение для удаления всех символов, кроме букв и цифр
  return inputString.replace(/[^a-zA-Zа-яА-Я0-9ёЁ.+]/g, "");
}
