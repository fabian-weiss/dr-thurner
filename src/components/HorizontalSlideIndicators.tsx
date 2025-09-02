"use client";

import { BaseComponentProps } from "@/types/base";
import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState } from "react";
import { FullscreenSlideProps } from "./FullscreenSlide";

type HorizontalSlideIndicatorsProps = {
  slides: FullscreenSlideProps[];
  activeIndex: number;
  onSlideChange: (index: number) => void;
  loop?: boolean;
  fullWidth?: boolean;
  barGap?: number;
  barHeight?: number;
  withBgImage?: boolean;
  activeFlex?: number;
  count?: number; // Optional count for the number of indicators
  autoplay?: boolean; // Optional auto-slide feature
  isRounded?: boolean;
};

export default function HorizontalSlideIndicators({
  slides,
  activeIndex,
  onSlideChange,
  loop = true,
  fullWidth = false,
  barGap = 8,
  barHeight = 4,
  className,
  withBgImage = false,
  activeFlex = 2,
  count = slides.length,
  autoplay: autoSlide = false,
  isRounded = false,
}: BaseComponentProps<HorizontalSlideIndicatorsProps>) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentDuration = slides[activeIndex]?.duration ?? 3000;

  useEffect(() => {
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const handleAutoSlide = () => {
      if (!autoSlide) return;
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / currentDuration) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          clearInterval(intervalRef.current!);
          const nextIndex =
            activeIndex < count - 1 ? activeIndex + 1 : loop ? 0 : activeIndex;
          onSlideChange(nextIndex);
        }
      }, 50);
    };
    handleAutoSlide();

    return () => clearInterval(intervalRef.current!);
  }, [activeIndex, currentDuration, loop, onSlideChange, slides.length]);

  const handleClick = (index: number) => {
    if (index !== activeIndex) {
      clearInterval(intervalRef.current!);
      setProgress(0);
      onSlideChange(index);
    }
  };

  return (
    <div
      className={cn("flex w-full items-center", className)}
      style={{ gap: `${barGap}px` }}
    >
      {slides.slice(0, count).map((slide, i) => {
        const isActive = i === activeIndex;
        const fillPercent = isActive ? progress : 0;

        return (
          <div
            key={`slide-indicator-${i}`}
            className={cn(
              "relative bg-neutral-300 rounded overflow-hidden cursor-pointer transition-colors",
              {
                "rounded-full": isRounded,
              }
            )}
            style={{
              flex: fullWidth ? (isActive ? activeFlex : 1) : undefined,
              height: barHeight,
              width: isRounded ? barHeight : fullWidth ? "auto" : "40px",
              backgroundImage: withBgImage
                ? `url(${slide.previewImage ?? slide.items[0].media?.src})`
                : undefined,
              transition:
                "width 300ms ease, height 300ms ease, border 300ms ease, margin 300ms ease, flex 300ms ease",
            }}
            onClick={() => handleClick(i)}
          >
            <div
              className={cn(
                "absolute top-0 left-0 h-full bg-white transition-[width]",
                {
                  "opacity-50": withBgImage,
                }
              )}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
