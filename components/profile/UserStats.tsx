import { getNumberNamecasesString, nFormatter } from "@/lib/utils";
import React from "react";
import StatsCard from "../cards/StatsCard";
import { BadgeCounts } from "@/types";

interface UserStatsProps {
  reputation: number;
  totalAnswers: number;
  totalQuestions: number;
  badges: BadgeCounts;
}

const UserStats = (props: UserStatsProps) => {
  const { totalAnswers, totalQuestions, badges, reputation } = props;
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">
        Репутация ${reputation}
      </h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {nFormatter(totalQuestions, 0)}
            </p>
            <p className="body-medium text-dark400_light700">
              {getNumberNamecasesString(
                totalQuestions,
                ["Вопрос", "Вопроса", "Вопросов"],
                false
              )}
            </p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {nFormatter(totalAnswers, 0)}
            </p>
            <p className="body-medium text-dark400_light700">
              {getNumberNamecasesString(
                totalQuestions,
                ["Ответ", "Ответа", "Ответов"],
                false
              )}
            </p>
          </div>
        </div>
        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={0}
          title={getNumberNamecasesString(
            badges.GOLD,
            ["Золотой знак", "Золотых знака", "Золотых знаков"],
            false
          )}
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={0}
          title={getNumberNamecasesString(
            badges.SILVER,
            ["Серебрянный знак", "Серебрянных знака", "Серебрянных знаков"],
            false
          )}
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={0}
          title={getNumberNamecasesString(
            badges.BRONZE,
            ["Бронзовый знак", "Бронзовых знака", "Бронзовых знаков"],
            false
          )}
        />
      </div>
    </div>
  );
};

export default UserStats;
