import UserCard from "@/components/cards/UserCard";
import PageHeader from "@/components/layout/PageHeader";
import NoResult from "@/components/shared/NoResult";
import { Pagination } from "@/components/shared/Pagination";
import { UserFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { User } from "@/types/database";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Сообщество — devOverflow",
  description:
    "devOverflow это открытое сообщество разработчиков. Присоединяйся!",
};

const CommunityPage = async (props: SearchParamsProps) => {
  const { searchParams } = props;
  const { users, isNext } = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Сообщество"
          search={{ placeholder: "Поиск пользователей", href: PATHS.COMMUNITY }}
          filter={{
            type: "secondary",
            values: UserFilters,
            default: UserFilters[0],
            placeholder: "Фильтр",
          }}
        />
      </div>
      <section className="mt-6 md:mt-10 flex flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user: User) => <UserCard key={user.name} user={user} />)
        ) : (
          <NoResult
            title="Пользователей не найдено"
            description=""
            linkUrl={PATHS.SIGN_UP}
            linkText="Присоедениться"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};

export default CommunityPage;
