"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "../../ui/skeleton";

interface ImageProps extends Partial<HTMLImageElement> {
  src: string;
  variant?: "default" | "avatar";
}

const Img = (props: ImageProps) => {
  const {
    variant = "default",
    alt = "",
    src,
    width,
    height,
    className,
  } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ width: width + "px", height: height + "px" }}
        className={`${className} ${variant === "avatar" && "rounded-full"} ${
          !isLoaded ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <Skeleton
          style={{
            width: width + "px",
            height: height + "px",
            top: 0,
            left: 0,
          }}
          className={`${className} ${
            variant === "avatar" && "rounded-full"
          } absolute`}
        />
      )}
    </div>
  );
};

export default Img;
