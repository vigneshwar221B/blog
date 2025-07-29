import { Image } from "next-sanity/image";

import type { Author } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

interface Props {
  name: string;
  picture: Exclude<Author["picture"], undefined> | null;
}

export default function Avatar({ name, picture }: Props) {
  return (
    <div className="flex items-center text-base">
      {picture?.asset?._ref ? (
        <div className="mr-2 h-8 w-8">
          <Image
            alt={picture?.alt || ""}
            className="h-full rounded-full object-cover"
            height={32}
            width={32}
            src={
              urlForImage(picture)
                ?.height(64)
                .width(64)
                .fit("crop")
                .url() as string
            }
          />
        </div>
      ) : (
        <div className="mr-1">By</div>
      )}
      <div className="font-medium">{name}</div>
    </div>
  );
}
