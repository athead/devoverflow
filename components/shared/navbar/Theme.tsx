"use client";

import { useTheme } from "@/context/ThemeProvider";
import React, { useCallback } from "react";
import { setCookie } from "cookies-next";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";
import { ThemeType } from "@/types";

const Theme = ({ theme }: { theme: "light" | "dark" }) => {
  const { mode, setMode } = useTheme();
  const changeThemeHandler = useCallback(
    (theme: ThemeType) => {
      setMode(theme.value);
      setCookie("x-theme", theme.value);
    },
    [setMode]
  );

  const getTheme = useCallback(() => {
    if (mode) return mode;
    else return theme;
  }, [mode, theme]);

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {getTheme() === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              className="active-theme"
              alt="sun"
              width={20}
              height={20}
              style={{ width: "20px", height: "20px" }}
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              className="active-theme"
              alt="moon"
              width={20}
              height={20}
              style={{ width: "20px", height: "20px" }}
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="background-light900_dark200 absolute right-[-3rem] mt-3 min-w-[150px] rounded border py-2 dark:border-dark-400">
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              className="flex cursor-pointer items-center gap-4 px-2.5 py-2 focus:bg-light-800 dark:focus:bg-dark-400"
              onClick={() => changeThemeHandler(item)}
            >
              <Image
                src={item.icon}
                alt={item.value}
                width={16}
                height={16}
                style={{ width: "16px", height: "16px" }}
                className={`${mode === item.value && "active-theme"}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
