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
    "undo redo | blocks | " +
    "codesample | bold italic forecolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist",
  content_style: "body { font-family:Inter; font-size:16px }",
  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript", value: "javascript" },
    { text: "JSX/TSX", value: "jsx" },
    { text: "Json", value: "json" },
    { text: "CSS", value: "css" },
    { text: "PHP", value: "php" },
    { text: "Python", value: "python" },
    { text: "Java", value: "java" },
  ],
};

interface EditorProps {
  theme: string;
  initialValue: string;
  onChange: (content: string) => void;
  onBlur: () => void;
  editorRef?: React.MutableRefObject<TinyMCEEditor | null>;
}

const TextEditor = (props: EditorProps) => {
  const { theme, initialValue, onChange, onBlur, editorRef } = props;
  const ownEditorRef = useRef<TinyMCEEditor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton
          style={{ height: 350, width: "100%" }}
          className="rounded-xl"
        />
      )}
      <Editor
        id="tiny-mce-editor-light"
        key={theme}
        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
        onInit={(evt, editor) => {
          editorRef
            ? (editorRef.current = editor)
            : (ownEditorRef.current = editor);
          setIsLoading(false);
        }}
        initialValue={initialValue}
        onBlur={onBlur}
        onEditorChange={onChange}
        init={{
          ...editorOptions,
          skin: theme === "dark" ? "oxide-dark" : "oxide",
          content_css: theme === "dark" ? "dark" : "light",
        }}
      />
    </div>
  );
};

export default TextEditor;
