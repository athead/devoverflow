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
