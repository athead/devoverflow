import { PATHS } from "@/constants/paths";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={PATHS.HOME} className="flex items-center gap-2">
      <Image
        src="/assets/images/site-logo.svg"
        width={23}
        height={23}
        style={{ width: "23px", height: "23px" }}
        alt="devOverflow"
      />
      <p className="h2-bold text-dark100_light900 font-rubik">
        dev<span className="text-primary-500">Overflow</span>
      </p>
    </Link>
  );
};

export default Logo;
