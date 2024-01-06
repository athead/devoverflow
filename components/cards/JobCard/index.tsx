import Link from "next/link";
import Image from "next/image";

import { getFormattedSalary, timeDifferenceStringFromNow } from "@/lib/utils";
import Metric from "../../shared/Metric";
import { Badge } from "../../ui/badge";

export interface JobCardProps {
  title: string;
  description: string;
  location: string;
  employerName?: string;
  metro?: string[];
  schedule: string;
  employment: string;
  salaryMin: number;
  retrainingCapability?: string;
  transportCompensationType?: string;
  // education: string;
  salaryMax: number;
  link: string;
  createdAt: Date;
}

const JobCard = ({
  title,
  description,
  location,
  employerName,
  employment,
  metro = [],
  retrainingCapability,
  transportCompensationType,
  schedule,
  createdAt,
  // salary,
  salaryMax,
  salaryMin,
  // education,
  link,
}: JobCardProps) => {
  const additionalInfo =
    metro.length > 0 || retrainingCapability || transportCompensationType;
  return (
    <div className="card-wrapper rounded-[10px]">
      <div className="flex w-full flex-col gap-3 p-6">
        <div className="flex w-full flex-row items-start justify-between">
          <div className="flex flex-col">
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 mb-2 line-clamp-2">
              {title}
            </h3>
            {employerName && (
              <h4 className="paragraph-medium text-dark400_light700">
                {employerName}
              </h4>
            )}
            <p className="body-regular mt-0.5 text-light-500">
              {timeDifferenceStringFromNow(createdAt)}
            </p>
          </div>

          <Badge className="whitespace-nowrap rounded-xl uppercase">
            {location}
          </Badge>
        </div>

        <p className="body-regular text-dark200_light900 line-clamp-3">
          {description}
        </p>
        {additionalInfo && (
          <div className="flex flex-wrap gap-2">
            {metro.map((item) => (
              <Badge
                key={item}
                className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase"
              >
                {item}
              </Badge>
            ))}
            {retrainingCapability && (
              <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
                {retrainingCapability}
              </Badge>
            )}
            {transportCompensationType && (
              <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
                {transportCompensationType}
              </Badge>
            )}
          </div>
        )}

        <div className="flex-between w-full flex-wrap gap-3">
          <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
            <Metric
              imgSrc="/assets/icons/briefcase.svg"
              alt="briefcase"
              value={employment}
              textStyles="small-medium text-light-500 text-center"
            />
            <Metric
              imgSrc="/assets/icons/people.svg"
              alt="people"
              value={schedule}
              textStyles="small-medium text-light-500 text-center"
            />
            <Metric
              imgSrc="/assets/icons/currency-ruble-circle.svg"
              alt="ruble"
              value={
                getFormattedSalary(salaryMin, salaryMax, null, false) ||
                "Не указано"
              }
              textStyles="small-medium text-light-500 text-center"
            />
          </div>
          <Link
            href={link || "/"}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="body-semibold primary-text-gradient">
              Перейти к вакансии
            </p>
            <Image
              alt="arrow up right"
              width={20}
              height={20}
              style={{ width: "20px", height: "20px" }}
              src="/assets/icons/arrow-up-right.svg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
