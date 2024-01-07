"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shares.types";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["question", "user", "answer", "tag"];
export async function globalSearch(params: SearchParams) {
  try {
    connectToDatabase();
    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      {
        model: Question,
        searchField: "title",
        type: "question",
        typeName: "Вопрос",
      },
      {
        model: User,
        searchField: "name",
        type: "user",
        typeName: "Пользователь",
      },
      {
        model: Answer,
        searchField: "content",
        type: "answer",
        typeName: "Ответ",
      },
      { model: Tag, searchField: "name", type: "tag", typeName: "Тег" },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // search across everything
      for (const { model, searchField, type, typeName } of modelsAndTypes) {
        const queryResult = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResult.map((item) => ({
            title:
              type === "answer"
                ? `Ответы, содержащие '${query}'`
                : item[searchField],
            type,
            typeName,
            id:
              type === "user"
                ? item.clearkId
                : type === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
    } else {
      // search in the specified model type
      const modelInfo = modelsAndTypes.find((item) => item.type === type);
      if (!modelInfo) {
        throw new Error("Неверный тип для поиска");
      }
      const queryResults = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Ответы, содержащие "${query}"`
            : item[modelInfo.searchField],
        type,
        typeName: item[modelInfo.typeName],
        id:
          type === "user"
            ? item.clearkId
            : type === "answer"
              ? item.question
              : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(`Ошибка глобального поиска: ${error}`);
    throw error;
  }
}
