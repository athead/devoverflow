import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import LocalSearchBar from "../shared/search/LocalSearchBar";
import { FilterType } from "@/types";
import Filter from "../shared/filters/Filter";
import TabFilter from "../shared/filters/TabFilter";

interface PageHearedProps {
  title: string;
  button?: {
    href: string;
    title: string;
  };
  search?: {
    placeholder?: string;
    href: string;
    searchParamsKey?: string;
    debounce?: number;
    onChange?: (value: string) => void;
  };
  filter?: {
    type: "primary" | "secondary";
    values: FilterType[];
    placeholder?: string;
    searchParamsKey?: string;
    default: FilterType;
    onChange?: (value: string) => void;
  };
}
const PageHeader = (props: PageHearedProps) => {
  const { title, button, search, filter } = props;
  const isSearchOrFilter = search || filter;
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">{title}</h1>
        {button && (
          <Link
            className="flex justify-end rounded-lg max-sm:w-full"
            href={button.href}
          >
            <Button size={"lg"} variant={"lightGradient"}>
              {button.title}
            </Button>
          </Link>
        )}
      </div>
      {isSearchOrFilter && (
        <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
          {search && (
            <LocalSearchBar
              route={search.href}
              iconPosition="left"
              imgSrc="/assets/icons/search.svg"
              placeholder={search.placeholder || "Поиск..."}
              otherClasses="flex-1"
              searchParamsKey={search.searchParamsKey}
              debounce={search.debounce}
              onChange={search.onChange}
            />
          )}
          {filter && (
            <Filter
              filters={filter.values}
              otherClasses="min-h-[56px] sm:min-w-[170px]"
              containerClasses={
                filter.type === "primary" ? "hidden max-md:flex" : ""
              }
              searchParamsKey={filter.searchParamsKey}
              placeholder={filter.placeholder || "Фильтр"}
              onChange={filter.onChange}
            />
          )}
        </div>
      )}
      {filter?.type === "primary" && (
        <TabFilter active={filter.values[1]} filters={filter.values} />
      )}
    </>
  );
};

export default PageHeader;
