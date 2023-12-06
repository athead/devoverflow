"use client";
import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const active = "recommended";
  return (
    <div className="mt-6 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          variant={"tab"}
          data-state={active === item.value ? "active" : ""}
          key={item.value}
          onClick={() => {}}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
