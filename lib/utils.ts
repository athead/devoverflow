import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNumberNamecasesString = (
  num: number | string,
  namecases?: [string, string, string]
) => {
  if (!namecases) return "";
  if (typeof num === "string") num = parseInt(num);
  let n = Math.abs(num);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return namecases[2];
  }
  n %= 10;
  if (n === 1) {
    return namecases[0];
  }
  if (n >= 2 && n <= 4) {
    return namecases[1];
  }
  return namecases[2];
};

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
      "примерно " +
      Math.round(elapsed / msPerDay) +
      ` ${getNumberNamecasesString(Math.round(elapsed / msPerDay), [
        "день",
        "дня",
        "дней",
      ])} назад`
    );
  } else if (elapsed < msPerYear) {
    return (
      "примерно " +
      Math.round(elapsed / msPerMonth) +
      ` ${getNumberNamecasesString(Math.round(elapsed / msPerMonth), [
        "месяц",
        "месяца",
        "месяцев",
      ])} назад`
    );
  } else {
    return (
      "примерно " +
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
