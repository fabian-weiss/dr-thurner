import { BaseComponentProps } from "@/types/base";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

export enum WithImageLayout {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  HORIZONTAL_REVERSE = "horizontal-reverse",
  VERTICAL_REVERSE = "vertical-reverse",
}

export type WithImageProps = {
  imageSrc?: string;
  imageAlt?: string;
  layout?: WithImageLayout;
  reverse?: boolean;
};

export default function WithImage({
  imageSrc,
  imageAlt,
  layout = WithImageLayout.HORIZONTAL,
  children,
  reverse = false,
  className,
}: BaseComponentProps<WithImageProps>) {
  return (
    <div
      className={cn(
        "flex gap-8",
        reverse ? "flex-col-reverse" : "flex-col",
        {
          "md:flex-row": layout === WithImageLayout.HORIZONTAL,
          "md:flex-col": layout === WithImageLayout.VERTICAL,
          "md:flex-row-reverse": layout === WithImageLayout.HORIZONTAL_REVERSE,
          "md:flex-col-reverse": layout === WithImageLayout.VERTICAL_REVERSE,
        },
        className
      )}
    >
      <div className="flex-shrink-0 flex-1 w-full">{children}</div>
      {imageSrc && (
        <div className="flex-1 w-full rounded-xl overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            height={500}
            width={500}
            className="object-contain h-full w-full"
          />
        </div>
      )}
    </div>
  );
}
