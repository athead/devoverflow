"use client";
import { FilterType } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import React from "react";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterComponentProps {
  filters: FilterType[];
  placeholder?: string;
  otherClasses?: string;
  containerClasses?: string;
  searchParamsKey?: string;
  onChange?: (value: string) => void;
}

const Filter = (props: FilterComponentProps) => {
  const {
    filters,
    placeholder = "Фильтр",
    containerClasses,
    otherClasses,
    searchParamsKey = "filter",
    onChange,
  } = props;

  const searchParams = useSearchParams();
  const router = useRouter();
  const paramFilter = searchParams.get(searchParamsKey);

  const handleUpdateParams = (value: string) => {
    if (onChange) return onChange(value);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: searchParamsKey,
      value,
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger
          className={`body-regular light-border background-light800_dark300 text-dark500_light700 line-clamp-1 flex h-9 min-h-[56px] w-full items-center justify-between gap-3 rounded-md border border-slate-200 bg-transparent p-4 text-sm shadow-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300 sm:max-w-[210px] ${otherClasses}`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
