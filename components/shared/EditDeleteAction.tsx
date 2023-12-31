"use client";

import { PATHS } from "@/constants/paths";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface EditDeleteActionProps {
  type: "question" | "answer";
  itemId: string;
}
const EditDeleteAction = (props: EditDeleteActionProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { itemId, type } = props;

  const handleEdit = () => {
    router.push(`${PATHS.QUESTION_EDIT}/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });
    } else if (type === "answer") {
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          style={{ width: "14px", height: "14px" }}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
