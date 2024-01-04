"use client";

import { Button } from "@/components/ui/button";
import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");

  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (type: string) => {
    if (active === type) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(type);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: type.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Тип</p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <Button
            type="button"
            variant={"globalTab"}
            className={`${
              active === item.value
                ? "bg-primary-500 text-light-900 hover:text-primary-100 dark:hover:text-primary-100 "
                : "bg-light-700 text-dark-400 hover:text-primary-500  dark:bg-dark-500"
            }`}
            key={item.value}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
