"use client";

import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import parse from "html-react-parser";

import "../../styles/vs-light.css";

import "prismjs/components/prism-python";
// import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
// import "prismjs/components/prism-csharp";
// import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
// import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
// import "prismjs/components/prism-dart";
// import "prismjs/components/prism-ruby";
// import "prismjs/components/prism-rust";
// import "prismjs/components/prism-r";
// import "prismjs/components/prism-kotlin";
// import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import { useTheme } from "@/context/ThemeProvider";
// import "prismjs/components/prism-sql";
// import "prismjs/components/prism-mongodb";

// import "prismjs/plugins/line-numbers/prism-line-numbers.js";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

type Props = {
  code: string;
  // language?: string;
  // showlineNumbers?: boolean;
  // lineHighlights?: number[];
};

const SyntaxHighlighter = ({
  // showlineNumbers = true,
  // language,
  code,
  // lineHighlights,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { mode: theme } = useTheme();

  useEffect(() => {
    if (ref.current) {
      // highlight this specific component only.
      Prism.highlightAllUnder(ref.current);
      // Importing files depending on time of the day
      if (theme === "dark") import(`../../styles/vs-${theme}.css`);
    }
  }, [theme]);

  return (
    <div ref={ref} className={`markdown w-full min-w-full ${theme}`}>
      {parse(code)}
    </div>
    // <div ref={ref} className="markdown w-full min-w-full">
    //   <pre
    //     className={cn({
    //       "line-numbers": showlineNumbers,
    //       [`language-${language}`]: true,
    //     })}
    //     data-line={lineHighlights?.join(",")}
    //   >
    //     <code>{code.trim()}</code>
    //   </pre>
    // </div>
  );
};

export default SyntaxHighlighter;

// interface ParseProps {
//   data: string;
// }

// const ParseHTML = ({ data }: ParseProps) => {
//   useEffect(() => {
//     Prism.highlightAll();
//   }, []);
//   return <div className="markdown w-full min-w-full">{parse(data)}</div>;
// };

// export default ParseHTML;
