"use client";

import React, { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MultipleSelector, { Option } from "../ui/MultipleSelector";

interface FilterComponentProps {
  options: Option[];
  route: string;
  placeholder?: string;
  paramKey?: string;
  onChange?: (value: Option[]) => void;
}

const parseJsonQuery = (value: string | null): string[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return parsed;
  } catch (error) {
    return [];
  }
};

const MultiSelect = (props: FilterComponentProps) => {
  const {
    options,
    placeholder = "Выберите значения",
    route,
    paramKey = "select",
    onChange,
  } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get(paramKey);

  const paramFilter = parseJsonQuery(query);
  const initialValue = options.filter((item) =>
    paramFilter.includes(item.value)
  );
  const [selectedOptions, setSelectedOptions] = useState(initialValue || []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (onChange) return onChange(selectedOptions);
      if (selectedOptions.length) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: paramKey,
          value: JSON.stringify(selectedOptions.map((el) => el.value)),
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: [paramKey],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 800);
    return () => clearTimeout(delayDebounceFn);
  }, [
    selectedOptions,
    route,
    pathname,
    router,
    searchParams,
    query,
    onChange,
    paramKey,
  ]);
  return (
    <MultipleSelector
      value={selectedOptions}
      options={options}
      hidePlaceholderWhenSelected={true}
      placeholder={placeholder}
      onChange={setSelectedOptions}
      emptyIndicator={
        <p className="text-center opacity-50">Выбраны все элементы</p>
      }
    />
  );

  //   <div className={`relative ${containerClasses}`}>
  //       <Select
  //         onValueChange={handleUpdateParams}
  //         defaultValue={paramFilter || undefined}
  //       >
  //         <SelectTrigger
  //           className={`body-regular light-border background-light800_dark300 text-dark400_light700 border px-5 py-2.5 ${otherClasses}`}
  //         >
  //           <div className="line-clamp-1 flex-1 text-left">
  //             <SelectValue placeholder={placeholder} />
  //           </div>
  //         </SelectTrigger>
  //         <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
  //           <SelectGroup>
  //             {filters.map((filter) => (
  //               <SelectItem
  //                 key={filter.value}
  //                 value={filter.value}
  //                 className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
  //               >
  //                 {filter.name}
  //               </SelectItem>
  //             ))}
  //           </SelectGroup>
  //         </SelectContent>
  //       </Select>
  //     </div>
};

export default MultiSelect;
