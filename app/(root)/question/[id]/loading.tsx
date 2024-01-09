import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center justify-start gap-1">
            <Skeleton
              style={{ width: "22px", height: "22px" }}
              className="rounded-full"
            />
            <Skeleton style={{ width: "60px", height: "18px" }} />
          </div>
          <div className="flex justify-end gap-2.5">
            <Skeleton style={{ width: "18px", height: "18px" }} />
            <Skeleton style={{ width: "18px", height: "18px" }} />
            <Skeleton style={{ width: "18px", height: "18px" }} />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-5 w-full text-left">
          <Skeleton style={{ width: "50%", height: "30px" }} />
        </h2>
      </div>
      <div className="mb-5 mt-3 flex flex-wrap gap-4">
        <Skeleton style={{ width: "80px", height: "16px" }} />
        <Skeleton style={{ width: "40px", height: "16px" }} />
        <Skeleton style={{ width: "70px", height: "16px" }} />
      </div>
      <Skeleton style={{ width: "30%", height: "20px" }} className="mb-2" />
      <Skeleton style={{ width: "80%", height: "20px" }} className="mb-2" />
      <Skeleton style={{ width: "100%", height: "400px" }} className="mb-2" />
      <Skeleton style={{ width: "80%", height: "20px" }} className="mb-2" />
      <Skeleton style={{ width: "70%", height: "20px" }} className="mb-2" />
      <Skeleton style={{ width: "50%", height: "20px" }} className="mb-2" />
      <Skeleton style={{ width: "80%", height: "20px" }} className="mb-2" />
      <Skeleton style={{ width: "70%", height: "20px" }} className="mb-2" />
      <Skeleton style={{ width: "50%", height: "20px" }} className="mb-2" />
      <div className="mt-8 flex flex-wrap gap-2">
        <Skeleton style={{ width: "50px", height: "30px" }} />
        <Skeleton style={{ width: "50px", height: "30px" }} />
        <Skeleton style={{ width: "50px", height: "30px" }} />
      </div>
    </>
  );
};

export default Loading;
