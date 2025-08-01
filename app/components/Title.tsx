"use client";

import { useState, useEffect } from "react";

export default function Title({ title }: { title: string }) {
  const [clickCount, setClickCount] = useState(0);

  const firstLetter = title.charAt(0);
  const restOfTitle = title.slice(1);

  useEffect(() => {
    if (clickCount === 5) {
      window.open("https://www.youtube.com/shorts/FPTEdeixfNg", "_blank");
      setClickCount(0);
    }
  }, [clickCount]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClickCount((prev) => prev + 1);
  };

  return (
    <h1 className="text-balance text-4xl font-bold leading-tight tracking-tighter lg:pr-8 lg:text-5xl underline decoration-[#ff5722] decoration-[0.5rem] underline-offset-[0.8rem]">
      <span
        onClick={handleClick}
        className="inline-block underline decoration-[#ff5722] decoration-[0.5rem] underline-offset-[0.8rem]"
      >
        {firstLetter}
      </span>
      {restOfTitle}
    </h1>
  );
}
