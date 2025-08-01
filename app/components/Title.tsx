"use client";

import { useState, useEffect } from "react";

export default function Title({ title }: { title: string }) {
  const [hovering, setHovering] = useState(false);

  const firstLetter = title.charAt(0);
  const restOfTitle = title.slice(1);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (hovering && e.key.toLowerCase() === "v") {
        window.open("https://www.youtube.com/shorts/FPTEdeixfNg", "_blank");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [hovering]);

  return (
    <>
      <span
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {firstLetter}
      </span>
      {restOfTitle}
    </>
  );
}
