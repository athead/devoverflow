import UserCard from "@/components/cards/UserCard";
import PageHeader from "@/components/layout/PageHeader";
import NoResult from "@/components/shared/NoResult";
import { UserFilters } from "@/constants/filters";
import { PATHS } from "@/constants/paths";
import { getAllUsers } from "@/lib/actions/user.action";
import React from "react";

const CommunityPage = async () => {
  const { users } = await getAllUsers({});
  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
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
      <section className="mt-12 flex flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user.name} user={user} />)
        ) : (
          <NoResult
            title="Пользователей не найдено"
            description=""
            linkUrl={PATHS.SIGN_UP}
            linkText="Присоедениться"
          />
        )}
      </section>
    </>
  );
};

export default CommunityPage;