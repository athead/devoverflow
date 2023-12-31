"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { formUrlQuery } from "@/lib/utils";

import type { FilterType } from "@/types";
import Switcher from "../ui/Swither";
import { JobScheduleTypeFilters } from "@/constants/filters";

const JobFilters = ({ filters }: { filters: FilterType[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState("");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex flex-wrap-reverse gap-3 md:flex-wrap">
      {filters.map((filter, index) => (
        <Button
          key={filter.value}
          onClick={() => handleTypeClick(filter.value)}
          className={`body-medium mb-0.5 mr-0.5 line-clamp-1 rounded-lg px-6 py-3 capitalize shadow-none md:mb-0 md:mr-0 ${
            active === filter.value
              ? "bg-primary-100 text-primary-500 dark:bg-dark-400 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          }
          `}
        >
          {filter.name}
        </Button>
      ))}
      <div className="background-light800_dark300 mt-2 flex items-center rounded-lg px-3 py-2 shadow-none md:mt-0">
        {JobScheduleTypeFilters.map((item) => (
          <Switcher key={item.value} query={item.value} label={item.name} />
        ))}
      </div>
    </div>
  );
};

export default JobFilters;
