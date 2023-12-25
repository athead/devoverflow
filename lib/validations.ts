import * as z from "zod";

export const askQuestionFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Заголовок не может быть меньше 5 символов.",
    })
    .max(150, {
      message: "Заголовок не может быть больше 150 символов.",
    }),
  explanation: z.string().min(100, {
    message: "Описание должно быть не менее 100 символов.",
  }),
  tags: z
    .array(
      z
        .string()
        .min(2, {
          message: "Тег не может быть менее 2 символов.",
        })
        .max(15, {
          message: "Тег не может быть более 15 символов.",
        })
    )
    .min(1, {
      message: "Необходимо добавить минимум 1 тег.",
    })
    .max(3, {
      message: "Нельзя добавить более 3 тегов.",
    }),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100, {
    message: "Ответ не может быть менее 100 символов.",
  }),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Не может быть менее 5 символов.",
    })
    .max(50, { message: "Не может быть более 50 символов." }),
  username: z
    .string()
    .min(5, {
      message: "Не может быть менее 5 символов.",
    })
    .max(50, { message: "Не может быть более 50 символов." }),
  portfolioWebsite: z
    .string()
    .url({ message: "Должно быть похоже на ссылку" })
    .min(5, {
      message: "Не может быть менее 5 символов.",
    })
    .max(150, { message: "Не может быть более 150 символов." }),
  location: z
    .string()
    .min(5, {
      message: "Не может быть менее 5 символов.",
    })
    .max(50, { message: "Не может быть более 50 символов." }),
  bio: z
    .string()
    .min(10, {
      message: "Не может быть менее 10 символов.",
    })
    .max(50, { message: "Не может быть более 50 символов." }),
});
