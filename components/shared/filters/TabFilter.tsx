"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { FilterType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface TabFilterProps {
  active: FilterType;
  filters: FilterType[];
}

const TabFilter = (props: TabFilterProps) => {
  const { filters } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState("");

  const handleFilterClick = (item: string) => {
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
    <div className="hidden flex-wrap gap-3 md:flex">
      {filters.map((item) => (
        <Button
          variant={"tab"}
          data-state={active === item.value ? "active" : ""}
          key={item.value}
          onClickCapture={() => {
            handleFilterClick(item.value);
          }}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default TabFilter;
