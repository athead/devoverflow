import QuestionTab from "@/components/profile/QuestionTab";
import ProfileLink from "@/components/profile/ProfileLink";
import UserStats from "@/components/profile/UserStats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PATHS } from "@/constants/paths";
import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedMonthYear } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AnswerTab from "@/components/profile/AnswerTab";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params, searchParams }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { user } = await getUserInfo({
    userId: params.id,
  });

  return {
    title: `Профиль пользователя ${user.username} — devOverflow`,
  };
}

const ProfilePage = async (props: URLProps) => {
  const { params, searchParams } = props;
  const { userId: clerkId } = auth();
  const { user, totalAnswers, totalQuestions, badgeCounts, reputation } =
    await getUserInfo({
      userId: params.id,
    });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={user.avatar}
            alt="profile picture"
            width={140}
            height={140}
            style={{ width: "140px", height: "140px" }}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedMonthYear(user.createdAt)}
              />
            </div>

            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === user.clerkId && (
              <Link href={PATHS.PROFILE_EDIT}>
                <Button variant={"secondary"}>Редактировать</Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <UserStats
        reputation={reputation}
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={badgeCounts}
      />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Вопросы
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Ответы
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab
              className="mt-5 flex w-full flex-col gap-6"
              searchParams={searchParams}
              userId={user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers">
            <AnswerTab
              className="mt-5 flex w-full flex-col gap-6"
              searchParams={searchParams}
              userId={user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
