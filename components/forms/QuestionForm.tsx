"use client";
import React, { useState } from "react";

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
import TextEditor from "../shared/TextEditor";
import { Tag } from "@/types/database";
import { toast } from "../ui/use-toast";
import { formatTagString } from "@/lib/utils";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedQuestionDetails = questionDetails && JSON.parse(questionDetails);
  const groupedTags = parsedQuestionDetails?.tags?.map((tag: Tag) => tag.name);
  //  form
  const form = useForm<z.infer<typeof askQuestionFormSchema>>({
    resolver: zodResolver(askQuestionFormSchema),
    defaultValues: {
      title: parsedQuestionDetails?.title || "",
      explanation: parsedQuestionDetails?.content || "",
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
      toast({
        title: `Ваш вопрос создан`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: `Ошибка создания вопрос`,
        variant: "destructive",
      });
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
    if (
      (e.key === "Enter" || e.key === "," || e.key === " ") &&
      field.name === "tags"
    ) {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = formatTagString(tagInput.value.trim()).toUpperCase();
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
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Подробное описание проблемы
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <TextEditor
                  initialValue={parsedQuestionDetails?.content || ""}
                  theme={theme}
                  onBlur={field.onBlur}
                  onChange={(content) => {
                    field.onChange(content);
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Подробно опишите суть пробемы. Минимум 100 символов.
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
                Метки <span className="text-primary-500">*</span>
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
                          variant={"questionTag"}
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
                              style={{ width: "12px", height: "12px" }}
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
                До 3 тегов, кратко описывающих запрос. Метки разделяются с
                помощью запятой, Enter или пробела
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
