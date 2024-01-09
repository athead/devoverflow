import { PATHS } from "@/constants/paths";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";
import Img from "../shared/ui/Img";
import { Tag, User } from "@/types/database";

interface UserCardProps {
  user: User;
}

const UserCard = async (props: UserCardProps) => {
  const { user } = props;
  const interactedTags = await getTopInteractedTags({ userId: user._id });
  return (
    <div className="shadow-light100_darknone w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333333%-1rem)]">
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Link
          href={`${PATHS.PROFILE}/${user.clerkId}`}
          className="flex w-full flex-col items-center justify-center text-center"
        >
          <Img
            src={user.avatar}
            alt="user profile"
            width={100}
            height={100}
            className="mb-3 rounded-full"
            variant="avatar"
          />
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500">@{user.username}</p>
        </Link>
        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag: Tag) => (
              <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>Нет тегов</Badge>
          )}
        </div>
      </article>
    </div>
  );
};

export default UserCard;
