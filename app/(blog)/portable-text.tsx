/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Refractor, registerLanguage } from 'react-refractor'

import bash from 'refractor/bash';
import json from 'refractor/json';
import yaml from 'refractor/yaml';
import docker from 'refractor/docker';
import ini from 'refractor/ini';
import terraform from 'refractor/hcl';
import js from 'refractor/javascript';
import ts from 'refractor/typescript';
import py from 'refractor/python';
import cpp from 'refractor/cpp';
import swift from 'refractor/swift';

registerLanguage(bash);
registerLanguage(json);
registerLanguage(yaml);
registerLanguage(docker);
registerLanguage(ini);
registerLanguage(terraform);
registerLanguage(js);
registerLanguage(ts);
registerLanguage(py);
registerLanguage(cpp);
registerLanguage(swift);

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      h5: ({ children }) => (
        <h5 className="mb-2 text-sm font-semibold dark:text-white">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="mb-1 text-xs font-semibold dark:text-white">{children}</h6>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a href={value?.href} rel="noreferrer noopener">
            {children}
          </a>
        );
      },
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
            <Refractor language={value.language} value={value.code} />
          </div>
      );
    },
  }
}

  return (
    <div className={["prose dark:prose-invert", className].filter(Boolean).join(" ")}>
      <PortableText components={components} value={value} />
    </div>
  );
}
