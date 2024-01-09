"use client";

import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { AnswerSchema } from "@/lib/validations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor as TinyMCEEditor } from "tinymce";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import TextEditor from "../shared/TextEditor";

interface AnswerFormProps {
  question: string;
  questionId: string;
  authorId?: string;
}

const AnswerForm = (props: AnswerFormProps) => {
  const pathname = usePathname();
  const { authorId, questionId, question } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);

  const { mode: theme } = useTheme();
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    if (!authorId)
      return toast({
        title: `Авторизуйтесь`,
        description: "Вы должны быть авторизованы для этого действия",
        variant: "default",
      });
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current;
        editor.setContent("");
      }
      toast({
        title: `Ваш ответ сохранен`,
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка созранения ответа`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateAIAnswer = async () => {
    if (!authorId)
      return toast({
        title: `Авторизуйтесь`,
        description: "Вы должны быть авторизованы для этого действия",
        variant: "default",
      });
    setIsSubmittingAI(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        { method: "POST", body: JSON.stringify({ question }) }
      );
      const aiAnswer = await response.json();

      // convert text to html format
      const formattedAnswer = aiAnswer.reply.replace(/\n/g, "<br />");
      if (editorRef.current) {
        const editor = editorRef.current;
        editor.setContent(formattedAnswer);
      }
      toast({
        title: `Ответ сгенерирован ChatGPT`,
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: `Ошибка генерации ответа от ChatGPT`,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingAI(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Введите Ваш ответ здесь
        </h4>
        <Button
          className="btn light-border-2 flex items-center gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={handleGenerateAIAnswer}
        >
          {isSubmittingAI ? (
            <>Генерирую...</>
          ) : (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="star"
                width={12}
                height={12}
                style={{ width: "12px", height: "12px" }}
                className="object-contain"
              />
              Спросить ИИ
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-4"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <TextEditor
                    initialValue=""
                    editorRef={editorRef}
                    theme={theme}
                    onBlur={field.onBlur}
                    onChange={(content) => {
                      field.onChange(content);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
