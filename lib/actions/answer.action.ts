"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shares.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import User, { IUser } from "@/database/user.model";
import Interaction from "@/database/interaction.model";
import { AnswerFilters } from "@/constants/filters";

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId, page, pageSize, sortBy } = params;

    let sortOptions = {};
    switch (sortBy) {
      case AnswerFilters[0].value:
        sortOptions = { upvotes: -1 };
        break;
      case AnswerFilters[1].value:
        sortOptions = { upvotes: 1 };
        break;
      case AnswerFilters[2].value:
        sortOptions = { createdAt: -1 };
        break;
      case AnswerFilters[3].value:
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate<{
        author: IUser;
      }>({ path: "author", model: User, select: "_id clerkId name avatar" })
      .sort(sortOptions);

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    // ass the answer to the questions
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
    return { newAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { hasDownVoted, hasUpVoted, path, answerId, userId } = params;

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Вопрос не найден");
    }

    // increment repputations

    revalidatePath(path);
    return { answer };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { hasDownVoted, hasUpVoted, answerId, path, userId } = params;

    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Ответ не найден");
    }

    // increment repputations
    revalidatePath(path);
    return { answer };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();
    const { path, answerId } = params;

    const answer = await Answer.findById(answerId);
    if (!answer) {
      throw new Error("Вопрос не найден");
    }
    await Answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
    return { answer };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
