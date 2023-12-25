"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { askQuestionFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { PATHS } from "@/constants/paths";

interface QuestionFormProps {
  formType: "edit" | "create";
  userId: string;
  questionDetails?: string;
}
const QuestionForm = (props: QuestionFormProps) => {
  const { formType, userId, questionDetails } = props;

  const { mode: theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedQuestionDetails = questionDetails
    ? JSON.parse(questionDetails)
    : "";
  // TODO remove any
  const groupedTags = parsedQuestionDetails?.tags?.map((tag: any) => tag.name);
  //  form
  const form = useForm<z.infer<typeof askQuestionFormSchema>>({
    resolver: zodResolver(askQuestionFormSchema),
    defaultValues: {
      title: parsedQuestionDetails.title || "",
      explanation: parsedQuestionDetails.content || "",
      tags: groupedTags || [],
    },
  });
  // submit handler.
  async function onSubmit(values: z.infer<typeof askQuestionFormSchema>) {
    setIsSubmitting(true);
    try {
      if (formType === "edit") {
        await editQuestion({
          title: values.title,
          content: values.explanation,
          questionId: parsedQuestionDetails._id,
          path: pathname,
        });
        // navigate to question page
        router.push(`${PATHS.QUESTION}/${parsedQuestionDetails._id}`);
      } else {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(userId),
          path: pathname,
        });
        // navigate to home page
        router.push(PATHS.HOME);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim().toUpperCase();
      if (tagValue !== "") {
        if (tagValue.length < 2) {
          return form.setError("tags", {
            type: "required",
            message: "Тег не может быть меньше 2 символов",
          });
        }
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Тег не может быть больше 15 символов",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Заголовок <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Представьте, что задаете вопрос другому человеку.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Подробное описание проблемы{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={parsedQuestionDetails.content || ""}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 350,
                    menubar: false,
                    language: "ru",
                    skin: theme === "dark" ? "oxide-dark" : "oxide",
                    content_css: theme === "dark" ? "dark" : "default",
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Подробно опишите суть пробемы, будто вы обьясняете ее другому
                человеку. Минимум 100 символов.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Теги <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={formType === "edit"}
                    placeholder="Добавьте тег..."
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2"
                          onClick={() =>
                            formType !== "edit"
                              ? handleTagRemove(tag, field)
                              : () => {}
                          }
                        >
                          <span>{tag}</span>
                          {formType !== "edit" && (
                            <Image
                              src="/assets/icons/close.svg"
                              alt="x"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                До 3 тегов, кратко описывающих запрос.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {formType === "create"
            ? isSubmitting
              ? "Создание..."
              : "Задать вопрос"
            : isSubmitting
              ? "Сохранение..."
              : "Сохранить изменения"}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
