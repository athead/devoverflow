"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CustomInputProps {
  route: string;
  iconPosition?: "left" | "right";
  imgSrc?: string;
  searchParamsKey?: string;
  placeholder: string;
  otherClasses?: string;
  debounce?: number;
  onChange?: (value: string) => void;
}

const LocalSearchBar = (props: CustomInputProps) => {
  const {
    iconPosition = "left",
    imgSrc,
    otherClasses,
    placeholder,
    route,
    searchParamsKey = "q",
    debounce = 300,
    onChange,
  } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get(searchParamsKey);

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (onChange) return onChange(search);
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: searchParamsKey,
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: [searchParamsKey],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, debounce);
    return () => clearTimeout(delayDebounceFn);
  }, [
    search,
    route,
    pathname,
    router,
    searchParams,
    query,
    onChange,
    searchParamsKey,
    debounce,
  ]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && imgSrc && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          style={{ width: "24px", height: "24px" }}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />
      {iconPosition === "right" && imgSrc && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          style={{ width: "24px", height: "24px" }}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
