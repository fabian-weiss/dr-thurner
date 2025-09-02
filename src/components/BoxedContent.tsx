/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseComponentProps } from "@/types/base";
import { ButtonType } from "@/types/ButtonType";
import { cn } from "@/utils/cn";
import Image, { ImageProps } from "next/image";
import React from "react";
import Button from "./Button";

export type BoxedContentProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  content?: React.ReactNode;
  buttons?: ButtonType[];
  rightContent?: React.ReactNode;
  backgroundColor?: string;
  backgroundImage?: Partial<ImageProps>;
  reverse?: boolean; // flips order on lg+
  contentLayout?: "horizontal" | "vertical";
  showOverlay?: boolean;
  enableContentGap?: boolean;
  /** optional: min height for left column on mobile so justify-end works */
  mobileLeftMinH?: string; // e.g. "40svh" | "56svh"
  mobileRightMinH?: string; // e.g., "40svh" (NEW)
  enableBorder?: boolean;
  overlay?: React.ReactNode;
  showBottomFade?: boolean;
};

export default function BoxedContent({
  title,
  subtitle,
  description,
  buttons,
  rightContent,
  backgroundColor,
  backgroundImage,
  reverse,
  className,
  id,
  content,
  contentLayout = "vertical",
  showOverlay,
  enableContentGap = true,
  mobileLeftMinH = "40svh",
  mobileRightMinH = "40dvh", // NEW default
  enableBorder = true,
  overlay,
  showBottomFade,
}: BaseComponentProps<BoxedContentProps>) {
  return (
    <div
      className={cn(
        // FLEX layout with stacking context
        "relative isolate overflow-hidden rounded-4xl lg:rounded-5xl flex flex-col lg:flex-row items-stretch gap-4 lg:gap-15 w-full",
        reverse && "lg:flex-row-reverse",
        className,
        {
          "border border-border": enableBorder,
        }
      )}
      style={{ backgroundColor }}
    >
      {/* Background image (stays inside container, behind content) */}
      {backgroundImage?.src && backgroundImage.alt && (
        <>
          <div
            className="absolute inset-0 z-0 pointer-events-none will-change-transform"
            aria-hidden
          >
            <Image
              src={backgroundImage.src}
              alt={backgroundImage.alt}
              fill
              className="object-cover"
              priority={false}
            />
          </div>

          {overlay && (
            <div className="absolute inset-0 pointer-events-none">
              {overlay}
            </div>
          )}

          {/* {showOverlay && (
            <div
              className="
                absolute inset-x-0 bottom-0 top-auto h-1/2 z-[1]
                bg-gradient-to-t from-text-dark/80 to-transparent
                rounded-[inherit] pointer-events-none
              "
              aria-hidden
            />
          )} */}

          {showBottomFade && (
            <div className="absolute w-full bottom-0 left-0 z-1 bg-gradient-to-b from-transparent to-primary pointer-events-none opacity-70 h-1/2" />
          )}
        </>
      )}

      {/* Left / text content */}
      <div
        className={cn(
          "relative z-[2] flex flex-col py-10 px-8 flex-1 gap-4 lg:p-12",
          // push to bottom on mobile; distribute on lg if desired
          enableContentGap ? "justify-end lg:justify-between" : "justify-end",
          "items-center text-center lg:items-start lg:text-start",
          // give mobile column enough height so justify-end has an effect
          `min-h-[${mobileLeftMinH}] lg:min-h-0`,
          "lg:flex-1" // only flex on desktop
        )}
      >
        {title && (
          <h2 className={cn({ "lg:w-1/2": contentLayout === "horizontal" })}>
            {title}
          </h2>
        )}

        <div
          className={cn("flex flex-col gap-4", {
            "lg:flex-row lg:justify-between lg:items-end":
              contentLayout === "horizontal",
          })}
        >
          <div className={cn({ "lg:w-1/2": contentLayout === "horizontal" })}>
            {subtitle && <p className="font-normal text-h4">{subtitle}</p>}
            {description && <p>{description}</p>}
            <div className="mt-4">{content}</div>
          </div>

          {buttons?.length ? (
            <div className="flex gap-2 lg:mt-2 items-center justify-center lg:justify-start">
              {buttons.map((button, index) => (
                <Button
                  className="shrink-0"
                  key={`${id}-button-${index}`}
                  {...button}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Right content: independent height on mobile, flexes on desktop */}
      {rightContent && (
        <div
          className={cn(
            "relative z-2 w-full",
            // Give Chrome a definite height on mobile
            `min-h-[40svh] lg:min-h-0 h-1 lg:h-auto`,
            // Share space on desktop
            "lg:flex-1"
          )}
          // make the value also available as a CSS var if you prefer:
          // style={{ ["--mediaH" as any]: mobileRightMinH }}
        >
          {/* For <Image fill> or other absolute content, ensure a sizing context */}
          <div className="relative h-full w-full">{rightContent}</div>
        </div>
      )}
    </div>
  );
}
