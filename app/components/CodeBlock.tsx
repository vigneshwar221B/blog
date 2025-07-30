"use client";

import { useState } from "react";
import {
  CodeBlock,
  dracula,
  oneLight,
  PrismLanguage,
} from "@react-email/code-block";
import { FaClipboard, FaCheck } from "react-icons/fa";

type CodeProps = {
  code: string;
  language: PrismLanguage;
  theme: string;
};

const Code = ({ code, language, theme }: CodeProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative text-lg p-5 overflow-auto leading-relaxed">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 bg-gray-200 dark:bg-gray-700 p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        title={copied ? "Copied!" : "Copy to clipboard"}
      >
        {copied ? (
          <FaCheck className="text-green-600 dark:text-green-400" />
        ) : (
          <FaClipboard />
        )}
      </button>
      <CodeBlock
        code={code}
        theme={theme === "dark" ? dracula : oneLight}
        language={language}
      />
    </div>
  );
};

export default Code;
