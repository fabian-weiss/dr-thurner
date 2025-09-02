import { BaseComponentProps } from "@/types/base";
import {
  RichTextLayout,
  RichTextSize,
  RichTextType,
} from "@/types/RichTextType";
import { cn } from "@/utils/cn";
import React from "react";
import Button from "./Button";

export default function RichText({
  topline,
  buttons,
  title,
  content,
  description,
  className,
  buttonsFirst,
  id,
  layoutType = RichTextLayout.VERTICAL,
  titleClassName,
  descriptionClassName,
  contentClassName,
  size = RichTextSize.LG, // ✅ Default to LG
  titleAs: TitleTag = "h2",
  toplineAs: ToplineTag = "p",
}: BaseComponentProps<RichTextType>) {
  // ✅ Define size-based styles
  // const sizeClasses = {
  //   [RichTextSize.SM]: {
  //     title: "text-2xl md:text-3xl font-semibold",
  //     description: "text-sm md:text-base text-gray-500",
  //     topline: "text-xs uppercase tracking-wide text-gray-400",
  //   },
  //   [RichTextSize.MD]: {
  //     title: "text-4xl md:text-5xl font-bold",
  //     description: "text-base md:text-lg text-gray-500",
  //     topline: "text-sm uppercase tracking-wide text-gray-400",
  //   },
  //   [RichTextSize.LG]: {
  //     title: "text-5xl md:text-6xl lg:text-7xl font-extrabold", // ✅ Matches original
  //     description: "text-lg md:text-xl text-gray-500",
  //     topline: "text-base uppercase tracking-wide text-gray-400",
  //   },
  // };

  // const currentSize = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex items-center lg:items-start justify-center lg:justify-start text-center lg:text-start",
        buttonsFirst ? "flex-col-reverse" : "flex-col",
        layoutType === RichTextLayout.HORIZONTAL &&
          "lg:flex-row lg:justify-between lg:gap-10 lg:items-center gap-6 w-full",
        className
      )}
    >
      <div>
        {topline && <ToplineTag>{topline}</ToplineTag>}
        {title && (
          <TitleTag className={cn("max-w-3xl", titleClassName)}>
            {title}
          </TitleTag>
        )}
        <div
          className={cn(
            "block",
            layoutType === RichTextLayout.HORIZONTAL && "md:hidden"
          )}
        >
          {description && (
            <p className={cn(title && "mt-4", descriptionClassName)}>
              {description}
            </p>
          )}
          {content && (
            <div className={cn("mt-2", contentClassName)}>{content}</div>
          )}
        </div>
      </div>
      <div
        className={cn(
          "flex items-center lg:items-start",
          buttonsFirst ? "flex-col-reverse" : "flex-col"
        )}
      >
        {layoutType === RichTextLayout.HORIZONTAL && (
          <div className={cn("hidden md:block")}>
            {description && (
              <p className={cn("max-w-[400px]", descriptionClassName)}>
                {description}
              </p>
            )}
            {content && (
              <div className={cn("mt-4", contentClassName)}>{content}</div>
            )}
          </div>
        )}
        {buttons && buttons.length > 0 && (
          <div className={cn("flex w-max", buttonsFirst ? "mb-4" : "mt-4")}>
            {buttons.map((button, index) => (
              <Button {...button} key={`rich-text-${id}-button-${index}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
