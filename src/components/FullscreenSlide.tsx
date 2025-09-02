"use client";
import { MediaFormat, MediaSlideLayout } from "@/constants/enums";
import { RichTextType } from "@/types/RichTextType";
import Image from "next/image";
import React from "react";
import RichText from "./RichText";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

export interface FullscreenSlideItem {
  media?: {
    src: string;
    alt?: string;
    type: MediaFormat; // IMAGE or VIDEO
    previewImage?: string; // Optional: used for video thumbnails
  };
  content?: React.ReactNode;
  className?: string; // Optional: for custom styling
  richText?: RichTextType; // Optional: rich text for the media item
  url?: string; // Optional: URL to navigate to on click
}

export interface FullscreenSlideProps {
  items: FullscreenSlideItem[];
  richText?: RichTextType;
  duration?: number;
  previewImage?: string; // Optional preview image for videos
  overlay?: React.ReactNode;
  layout?: MediaSlideLayout;
  showBottomFade?: boolean; // Optional prop to control bottom fade
  className?: string; // Optional className for custom styling
  showSliderIndicators?: boolean; // Optional prop to show slider indicators
}

export default function FullscreenSlide({
  items,
  richText,
  overlay,
  layout,
  showBottomFade,
  className,
  showSliderIndicators = false, // Default to true if not provided
}: FullscreenSlideProps) {
  const router = useRouter();

  const handleClick = (url?: string) => {
    if (!url) return;
    if (url.startsWith("/")) {
      router.push(url);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, url?: string) => {
    if (!url) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(url);
    }
  };
  return (
    <div className={cn("relative w-full h-full", className)}>
      <div
        className={cn(
          "relative w-full h-full grid justify-center items-center",
          layout === MediaSlideLayout.HORIZONTAL ? "grid-cols-2" : "grid-cols-1"
        )}
      >
        {items.map((item: FullscreenSlideItem, index: number) => {
          return (
            <div
              key={index}
              className={cn(
                "relative w-full h-full flex items-center justify-center flex-shrink-0",
                item.className,
                item.url && "cursor-pointer"
              )}
              onClick={() => handleClick(item.url)}
              onKeyDown={(e) => handleKeyDown(e, item.url)}
              role={item.url ? "link" : undefined}
              tabIndex={item.url ? 0 : undefined}
            >
              {item.media?.type === MediaFormat.IMAGE && (
                <Image
                  src={item.media.src}
                  alt={item.media.alt || ""}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              )}
              {item.media?.type === MediaFormat.VIDEO && (
                <video
                  src={item.media.src}
                  muted
                  autoPlay
                  playsInline
                  loop
                  controls={false}
                  poster={item.media.previewImage}
                  className="absolute inset-0 w-full h-full object-cover"
                  preload="metadata"
                />
              )}
              {item.content && <>{item.content}</>}
              {/* {item.richText && (
                <div className="absolute bottom-4 left-4">
                  <RichText {...item.richText} />
                </div>
              )} */}
            </div>
          );
        })}
      </div>

      {/* ✅ Custom Overlay */}
      {overlay && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {overlay}
        </div>
      )}

      {/* ✅ Rich Text */}
      {richText && (
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 z-20 text-white text-sm md:text-base leading-relaxed w-full lg:max-w-1/2",
            {
              "fw-content-wrapper": showSliderIndicators,
              "lg:left-4": showSliderIndicators,
            }
          )}
        >
          <RichText
            {...richText}
            className="text-start p-8 lg:p-15 items-start"
          />
        </div>
      )}

      {/* ✅ Bottom Fade */}
      {showBottomFade && (
        <div
          style={{ height: "20dvh" }}
          className="absolute w-full bottom-0 left-0 z-1 bg-gradient-to-b from-transparent to-primary pointer-events-none opacity-70"
        />
      )}
    </div>
  );
}
