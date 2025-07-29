import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/fetch";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = await sanityFetch({
    query: `*[_type == "post" && title match $query + "*"]{
      _id,
      title,
      slug
    }`,
    params: { $query: query } ,
  });

  return NextResponse.json({ results });
}
