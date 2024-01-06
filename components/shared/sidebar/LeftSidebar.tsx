"use client";
import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/constants/paths";

const LeftSidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-2">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          if (item.route === PATHS.PROFILE) {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 rounded-lg bg-transparent p-4 hover:bg-light-800 dark:hover:bg-dark-300`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                style={{ width: "20px", height: "20px" }}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href={PATHS.SIGN_IN}>
            <Button size={"default"} variant={"simpleSecondary"} block={"full"}>
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                style={{ width: "20px", height: "20px" }}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">Войти</span>
            </Button>
          </Link>
          <Link href={PATHS.SIGN_UP}>
            <Button size={"default"} variant={"simpleSecondary"} block={"full"}>
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                style={{ width: "20px", height: "20px" }}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Регистрация</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
