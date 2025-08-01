/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

"use client";

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import CodeBlock from "@/app/components/CodeBlock";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid hydration mismatch

  const components: PortableTextComponents = {
    block: {
      h5: ({ children }) => (
        <h5 className="mb-2 text-sm font-semibold dark:text-white">
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6 className="mb-1 text-xs font-semibold dark:text-white">
          {children}
        </h6>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            href={value?.href}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-8 hover:text-[#f50057] text-[#f06292]"
          >
            {children}
          </a>
        );
      },
      code: ({ children }) => (
        <span
          className="rounded px-1 py-0.5 text-sm font-mono"
          style={{ backgroundColor: "#607d8b", color: "white" }}
        >
          {children}
        </span>
      ),
    },

    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;
        const url = urlFor(value);

        return (
          <figure className="my-8">
            <div className="relative w-full aspect-[16/9] mb-4 dark:text-white">
              <Image
                src={url}
                alt={value.alt || "Blog image"}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 768px"
                loading="lazy"
              />
            </div>
            {value.caption && (
              <figcaption className="text-center text-sm text-muted-foreground">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      code: ({ value }) => {
        return (
          <div className="text-lg p-5 overflow-auto leading-relaxed">
            <CodeBlock
              code={value.code}
              language={value.language}
              theme={resolvedTheme ?? "light"}
            />
          </div>
        );
      },
    },
  };

  return (
    <div
      className={["prose dark:prose-invert", className]
        .filter(Boolean)
        .join(" ")}
    >
      <PortableText components={components} value={value} />
    </div>
  );
}
