"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { nFormatter } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { toast } from "../ui/use-toast";

interface VotesProps {
  type: "question" | "answer";
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpVoted: boolean;
  downvotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = (props: VotesProps) => {
  const {
    downvotes,
    hasDownVoted,
    hasSaved = false,
    hasUpVoted,
    itemId,
    type,
    upvotes,
    userId,
  } = props;

  const path = usePathname();
  const router = useRouter();

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path,
    });
    return toast({
      title: `${!hasSaved ? "Добавлено в избранное" : "Удалено из избранного"}`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };

  const handleVote = useCallback(
    async (action: string) => {
      if (!userId)
        return toast({
          title: "Войдите",
          description:
            "Вы должны войти или зарегестрироваться для этого действия",
        });
      if (action === "up") {
        if (type === "question") {
          await upvoteQuestion({
            questionId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasUpVoted,
            hasDownVoted,
            path,
          });
        } else if (type === "answer") {
          await upvoteAnswer({
            answerId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasUpVoted,
            hasDownVoted,
            path,
          });
        }
        toast({
          title: `Ваш голос ${!hasUpVoted ? "учтен" : "отменен"}`,
          variant: !hasUpVoted ? "default" : "destructive",
        });
      } else if (action === "down") {
        if (type === "question") {
          await downvoteQuestion({
            questionId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasUpVoted,
            hasDownVoted,
            path,
          });
        } else if (type === "answer") {
          await downvoteAnswer({
            answerId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasUpVoted,
            hasDownVoted,
            path,
          });
        }
        toast({
          title: `Ваш голос ${!hasDownVoted ? "учтен" : "отменен"}`,
          variant: !hasDownVoted ? "default" : "destructive",
        });
      }
      // toast
    },
    [hasDownVoted, hasUpVoted, path, itemId, userId, type]
  );

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, path, router]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => {
              handleVote("up");
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {nFormatter(upvotes, 0)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => {
              handleVote("down");
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {nFormatter(downvotes, 0)}
            </p>
          </div>
        </div>
        {type === "question" && (
          <div className="flex-center gap-1.5">
            <Image
              src={
                hasSaved
                  ? "/assets/icons/star-filled.svg"
                  : "/assets/icons/star-red.svg"
              }
              width={18}
              height={18}
              alt="star"
              className="cursor-pointer"
              onClick={() => {
                handleSave();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Votes;
