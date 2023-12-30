"use client";
import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState("");

  const handleFilterClick = (item: string) => {
    console.log(item);
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
    <div className="mt-6 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          variant={"tab"}
          data-state={active === item.value ? "active" : ""}
          key={item.value}
          onClick={() => {
            handleFilterClick(item.value);
          }}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
