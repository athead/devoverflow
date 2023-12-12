import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";
import { cookies } from "next/headers";
import Logo from "../Logo";
import { PATHS } from "@/constants/paths";

const Navbar = () => {
  const theme = cookies().get("x-theme")?.value;
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Logo />
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme theme={theme === "dark" ? "dark" : "light"} />
        <SignedIn>
          <UserButton
            afterSignOutUrl={PATHS.HOME}
            appearance={{
              elements: { avatarBox: "h-10 w-10" },
              variables: { colorPrimary: "#ff7000" },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
