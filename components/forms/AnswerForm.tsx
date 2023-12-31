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
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
import { toast } from "../ui/use-toast";

interface AnswerFormProps {
  question: string;
  questionId: string;
  authorId: string;
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
    if (!authorId) return;
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
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue=""
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
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
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
