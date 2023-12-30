"use server";

import Tag, { ITag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import Question, { IQuestion } from "@/database/question.model";
import {
  GetQuestionsParams,
  CreateQuestionParams,
  GetQuestionByIdParams,
  QuestionVoteParams,
  DeleteQuestionParams,
  EditQuestionParams,
} from "./shares.types";
import User, { IUser } from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";
import { HomePageFilters } from "@/constants/filters";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 20 } = params;

    // Calculate the number of posts to skip
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case HomePageFilters[0].value:
        sortOptions = { createdAt: -1 };
        break;
      case HomePageFilters[1].value:
        sortOptions = { views: -1 };
        break;
      case HomePageFilters[2].value:
        query.answers = { $size: 0 };
        break;
      case HomePageFilters[3].value:
        break;

      default:
        break;
    }

    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalQuestions = await Question.countDocuments(query);
    const isNext = totalQuestions > skipAmount + questions.length;

    return { questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById<IQuestion>(questionId)
      .populate<{ tags: ITag[] }>({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate<{ author: IUser }>({
        path: "author",
        model: User,
        select: "_id clerkId name avatar",
      });
    // if (!question) throw new Error("Ошибка получения вопроса");
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;
    // Create a question
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];
    // Create a tag or get if exists
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        {
          $setOnInsert: { name: tag },
          $push: {
            questions: question._id,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // create an interaction record for the user's ask_qustion action
    await Interaction.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagDocuments,
    });

    // incremente author's reputation for creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { hasDownVoted, hasUpVoted, path, questionId, userId } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Вопрос не найден");
    }

    // increment author's reputations by +1/-1 for upvoting/revoking an upvote to the question
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasUpVoted ? -1 : 1 },
    });

    // increment author's reputations by +10/-10 for reciving an upvote/downvote
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasUpVoted ? -10 : 10 },
    });

    revalidatePath(path);
    return { question };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { hasDownVoted, hasUpVoted, path, questionId, userId } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Вопрос не найден");
    }

    // increment author's reputations by +1/-1 for upvoting/revoking an upvote to the question
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownVoted ? -1 : 1 },
    });

    // increment author's reputations by +10/-10 for reciving an upvote/downvote
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasDownVoted ? -10 : 10 },
    });

    revalidatePath(path);
    return { question };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    connectToDatabase();
    const { path, questionId } = params;

    const question = await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { question: questionId },
      { $pull: { question: questionId } }
    );
    revalidatePath(path);
    return { question };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();
    const { path, questionId, content, title } = params;

    const question = await Question.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Вопрос не найден");
    }
    question.title = title;
    question.content = content;
    await question.save();
    revalidatePath(path);
    return { question };
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function getHotQuestions() {
  try {
    connectToDatabase();

    const hotQuestion = await Question.find({})
      .sort({
        views: -1,
        upvotes: -1,
      })
      .limit(5);
    return hotQuestion;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
