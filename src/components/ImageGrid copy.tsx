// Full width image grid with default column number of 6 where each image can get a specific
// span value to control its size within the grid.

import { BaseComponentProps } from "@/types/base";
import { cn } from "@/utils/cn";
import Image, { ImageProps } from "next/image";
import React from "react";

export type ImageGridProps = {
  images: (Partial<ImageProps> & { span?: number })[];
  columns?: number;
};

export default function ImageGrid({
  images,
  className,
}: BaseComponentProps<ImageGridProps>) {
  return (
    <div className={cn(`grid grid-cols-6 h-full w-full`, className)}>
      {images.map((image, index) => (
        <div
          key={`image-grid-${index}`}
          className={`col-span-${
            image.span || 1
          } relative h-48 md:h-64 lg:h-80 2xl:h-96`}
        >
          {image.src ? (
            <Image
              alt={image.alt ?? ""}
              fill
              className="object-cover"
              src={image.src}
              {...image}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
