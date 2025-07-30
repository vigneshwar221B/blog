import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Avatar from "../../avatar";
import CoverImage from "../../cover-image";
import DateComponent from "../../date";
import MoreStories from "../../more-stories";
import PortableText from "../../portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery, settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Comments from "@/app/components/Comments";
import ThemeToggle from "@/app/components/ThemeToggle";
import SearchBox from "@/app/components/SearchBox";

type Props = {
  params: Promise<{ slug: string }>;
};

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: postSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  const [post, settings] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-5 dark:text-white">
      <div className="mb-16 mt-10 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter dark:text-white underline decoration-[#64b5f6] decoration-[0.4rem]">
          <Link href="/" className="hover">
            {settings?.title || demo.title}
          </Link>
        </h2>
        <div className="mt-4 flex items-center gap-4 lg:mt-0">
          <ThemeToggle />
          <SearchBox />
        </div>
      </div>

      <article>
        <h1 className="text-balance mb-6 text-4xl font-semibold leading-snug tracking-tight md:text-5xl lg:text-6xl">
          {post.title}
        </h1>

        <div className="hidden md:mb-12 md:block">
          {post.author && (
            <Avatar name={post.author.name} picture={post.author.picture} />
          )}
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage image={post.coverImage} priority />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 block md:hidden">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div>
          <div className="mb-6 text-lg bold">
            <div className="mb-4 text-lg">
              <DateComponent dateString={post.date} />
            </div>
          </div>
        </div>
        {post.content?.length && (
          <>
            <PortableText
              className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
              value={post.content as PortableTextBlock[]}
            />

            <hr className="my-8 border-gray-300 w-3/4 mx-auto" />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-16">
              <Comments />
            </div>
          </>
        )}
      </article>
      <aside>
        <hr className="border-accent-2 mb-24 mt-28" />
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl underline decoration-[#7e3ff2] decoration-[0.5rem]">
          Recent Stories
        </h2>
        <Suspense>
          <MoreStories skip={post._id} limit={4} />
        </Suspense>
      </aside>
    </div>
  );
}
