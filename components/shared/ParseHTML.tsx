"use client";

import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import parse from "html-react-parser";

import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";

import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

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
  useEffect(() => {
    if (ref.current) {
      // highlight this specific component only.
      Prism.highlightAllUnder(ref.current);
    }
  }, []);

  return (
    <div ref={ref} className="markdown w-full min-w-full">
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
