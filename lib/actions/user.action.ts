"use server";

import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shares.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";
import { QuestionFilters, UserFilters } from "@/constants/filters";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const query: FilterQuery<typeof User> = {};

    const skipAmount = (page - 1) * pageSize;

    if (searchQuery) {
      query.$or = [
        { user: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case UserFilters[0].value:
        sortOptions = { createdAt: -1 };
        break;
      case UserFilters[1].value:
        sortOptions = { createdAt: 1 };
        break;
      case UserFilters[2].value:
        sortOptions = { reputation: -1 };
        break;

      default:
        break;
    }

    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totaUsers = await User.countDocuments(query);
    const isNext = totaUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;
    const newUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;
    const user = await User.findById({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    // Delete user and all his data from database
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );
    // console.log(userQuestionIds);
    // delete user questions
    await Question.deleteMany({ author: user._id });

    // delete user
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { path, questionId, userId } = params;

    const user = await User.findById(userId);
    const isQuestionSaves = user.saved.includes(questionId);
    if (isQuestionSaves) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      // add to set
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }
    revalidatePath(path);
    return { user };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserCollection(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();
    const { page = 1, pageSize = 20, filter, searchQuery, clerkId } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortOptions = {};
    switch (filter) {
      case QuestionFilters[0].value:
        sortOptions = { createdAt: -1 };
        break;
      case QuestionFilters[1].value:
        sortOptions = { createdAt: 1 };
        break;
      case QuestionFilters[2].value:
        sortOptions = { upvotes: -1 };
        break;
      case QuestionFilters[3].value:
        sortOptions = { views: -1 };
        break;
      case QuestionFilters[4].value:
        sortOptions = { answers: -1 };
        break;
      default:
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name avatar" },
      ],
    });

    if (!user) throw new Error("Пользователь не найден");

    const savedQuestions = user.saved;

    const isNext = savedQuestions.length > pageSize;

    return { questions: savedQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("Пользователь не найден");

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalAnswers, totalQuestions };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const user = await User.findOne({ userId });
    if (!user) throw new Error("Пользователь не найден");

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const userQuestions = await Question.find({ author: userId })
      .sort({
        createdAt: -1,
        views: -1,
        upvotes: -1,
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "tags", select: "_id name" })
      .populate({
        path: "author",
        select: "_id clerkId name avatar",
      });

    const isNext = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, questions: userQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const user = await User.findOne({ userId });
    if (!user) throw new Error("Пользователь не найден");

    const totalAnswers = await Answer.countDocuments({ author: user._id });
    const userAnswers = await Answer.find({ author: user._id })
      .sort({
        createdAt: -1,
        upvotes: -1,
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "question", select: "_id title" })
      .populate({
        path: "author",
        select: "_id clerkId name avatar",
      });

    const isNext = totalAnswers > skipAmount + userAnswers.length;

    return { totalAnswers, answers: userAnswers, isNext };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
