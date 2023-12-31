"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { Skeleton } from "../ui/skeleton";

const editorOptions = {
  height: 350,
  menubar: false,
  language: "ru",
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
};

interface EditorProps {
  theme: string;
  initialValue: string;
  onChange: (content: string) => void;
  onBlur: () => void;
}

// skin: theme === "dark" ? "oxide-dark" : "oxide",
// content_css: theme === "dark" ? "dark" : "default",

const TextEditor = (props: EditorProps) => {
  const { theme, initialValue, onChange, onBlur } = props;
  const editorDarkRef = useRef<TinyMCEEditor | null>(null);
  const editorLightRef = useRef<TinyMCEEditor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (theme === "dark") {
  //     console.log(editorLightRef.current);
  //     editorLightRef.current?.hide();
  //     const content = editorLightRef.current?.getContent()
  //     editorDarkRef.current?.show();
  //     editorDarkRef.current?.setContent(content)
  //   } else {
  //     const content = editorDarkRef.current?.getContent()
  //     editorDarkRef.current?.hide();
  //     editorLightRef.current?.show();
  //     editorDarkRef.current?.setContent(content)
  //   }
  // }, [theme]);

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton
          style={{ height: 350, width: "100%" }}
          className="rounded-xl"
        />
      )}
      {theme === "light" ? (
        <Editor
          id="tiny-mce-editor-light"
          apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
          onInit={(evt, editor) => {
            editorLightRef.current = editor;
            setIsLoading(false);
          }}
          initialValue={initialValue}
          onBlur={onBlur}
          onEditorChange={onChange}
          init={{
            ...editorOptions,
            skin: "oxide",
            content_css: "default",
          }}
        />
      ) : (
        <Editor
          id="tiny-mce-editor-dark"
          apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
          onInit={(evt, editor) => {
            editorDarkRef.current = editor;
            setIsLoading(false);
          }}
          initialValue={initialValue}
          onBlur={onBlur}
          onEditorChange={onChange}
          init={{
            ...editorOptions,
            skin: "oxide-dark",
            content_css: "dark",
          }}
        />
      )}
    </div>
  );
};

export default TextEditor;
