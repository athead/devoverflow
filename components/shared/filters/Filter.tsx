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

interface FilterComponentProps {
  filters: FilterType[];
  placeholder?: string;
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = (props: FilterComponentProps) => {
  const {
    filters,
    placeholder = "Фильтр",
    containerClasses,
    otherClasses,
  } = props;
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`body-regular light-border background-light800_dark300 text-dark400_light700 border px-5 py-2.5 ${otherClasses}`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="background-light900_dark200 text-dark400_light700">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="cursor-pointer"
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
