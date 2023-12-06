import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image
        src="/assets/images/site-logo.svg"
        width={23}
        height={23}
        alt="devOverflow"
      />
      <p className="h2-bold text-dark100_light900 font-rubik">
        dev<span className="text-primary-500">Overflow</span>
      </p>
    </Link>
  );
};

export default Logo;
