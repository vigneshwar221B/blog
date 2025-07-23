"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <Giscus
      id="comments"
      repo="vigneshwar221B/blog"
      repoId="R_kgDOPQF9Pg"
      category="General"
      categoryId="DIC_kwDOPQF9Ps4CtUCS"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}