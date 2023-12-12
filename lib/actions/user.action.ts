"use server";

import User, { IUser } from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shares.types";
import { revalidatePath } from "next/cache";
import Question, { IQuestion } from "@/database/question.model";
import Tag from "@/database/tag.model";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
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

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const user = await User.findOne<IUser>({ clerkId })
      .populate<{
        saved: IQuestion[];
      }>({
        path: "saved",
        match: query,
        model: Question,
        options: {
          sort: { createdAt: -1 },
        },
        populate: [
          { path: "tags", model: Tag, select: "_id name" },
          { path: "author", model: User, select: "_id clerkId name avatar" },
        ],
      })
      .sort({ createdAt: -1 });

    if (!user) throw new Error("Пользователь не найден");

    const savedQuestions = user.saved;
    return { questions: savedQuestions };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
