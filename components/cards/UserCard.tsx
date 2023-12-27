import { PATHS } from "@/constants/paths";
import { IUser } from "@/database/user.model";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface UserCardProps {
  // TODO отвязать
  user: IUser;
}

const UserCard = async (props: UserCardProps) => {
  const { user } = props;
  const interactedTags = await getTopInteractedTags({ userId: user._id });
  return (
    <Link
      href={`${PATHS.PROFILE}/${user.clerkId}`}
      className="shadow-light100_darknone max-sx:min-w-full w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.avatar}
          alt="user profile"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>Нет тегов</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;