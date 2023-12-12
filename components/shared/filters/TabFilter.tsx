"use client";

import React from "react";
import { Button } from "../../ui/button";
import { FilterType } from "@/types";

interface TabFilterProps {
  active: FilterType;
  filters: FilterType[];
}

const TabFilter = (props: TabFilterProps) => {
  const { active, filters } = props;
  return (
    <div className="hidden flex-wrap gap-3 md:flex">
      {filters.map((item) => (
        <Button
          variant={"tab"}
          data-state={active.value === item.value ? "active" : ""}
          key={item.value}
          onClick={() => {}}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default TabFilter;
