import Link from "next/link";

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";

import { sanityFetch } from "@/sanity/lib/fetch";
import { moreStoriesQuery } from "@/sanity/lib/queries";

export default async function MoreStories(params: {
  skip: string;
  limit: number;
}) {
  const data = await sanityFetch({ query: moreStoriesQuery, params });

  return (
    <>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {data?.map((post) => {
          const { _id, title, slug, coverImage, excerpt, author } = post;
          return (
            <Link
      key={_id}
      href={`/posts/${slug}`}
      className="group block"
    >
      <article>
        <CoverImage image={coverImage} priority={false} />
        <h3 className="text-balance mb-3 text-3xl leading-snug group-hover:underline decoration-[#ff5722] decoration-[0.3rem]">
          {title}
        </h3>
        <div className="mb-4 text-lg">
          <DateComponent dateString={post.date} />
        </div>
        {excerpt && (
          <p className="text-pretty mb-4 text-lg leading-relaxed">
            {excerpt}
          </p>
        )}
        {author && <Avatar name={author.name} picture={author.picture} />}
      </article>
    </Link>
          );
        })}
      </div>
    </>
  );
}
