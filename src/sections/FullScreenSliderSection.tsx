"use client";

import FullscreenSlide, {
  FullscreenSlideProps,
} from "@/components/FullscreenSlide";
import HorizontalSlideIndicators from "@/components/HorizontalSlideIndicators";
import SectionWrapper from "@/components/SectionWrapper";
import { useViewportSize } from "@/hooks/useViewportSize";
import { BaseComponentProps } from "@/types/base";
import { cn } from "@/utils/cn";
import React, { useState, useMemo, useCallback } from "react";

export type FullscreenSliderSectionProps = {
  desktopSlides: BaseComponentProps<FullscreenSlideProps>[];
  mobileSlides?: BaseComponentProps<FullscreenSlideProps>[];
  showIndicators?: boolean;
  loop?: boolean;
  showBottomFade?: boolean;
  horizontalCount?: number; // Number of slides per view
  autoplay?: boolean;
  roundedIndicators?: boolean;
  indicatorShowBg?: boolean;
  sliderIndicatorClassName?: string;
};

export default function FullscreenSliderSection({
  desktopSlides,
  mobileSlides,
  showIndicators = true,
  loop = true,
  showBottomFade,
  horizontalCount = 1,
  autoplay = true,
  roundedIndicators = false,
  indicatorShowBg = false,
  sliderIndicatorClassName,
  className,
}: BaseComponentProps<FullscreenSliderSectionProps>) {
  const { width } = useViewportSize();
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(() => {
    if (width < 1024 && mobileSlides?.length) return mobileSlides;
    return desktopSlides;
  }, [width, mobileSlides, desktopSlides]);

  const totalSlides = slides.length;

  const sliderIndicatorVisible: boolean = useMemo(() => {
    return showIndicators && totalSlides > horizontalCount;
  }, [showIndicators, totalSlides, horizontalCount]);

  const handleSlideChange = useCallback(
    (newIndex: number) => {
      if (loop) {
        if (newIndex < 0) newIndex = totalSlides - 1;
        else if (newIndex >= totalSlides) newIndex = 0;
      } else {
        newIndex = Math.max(0, Math.min(newIndex, totalSlides - 1));
      }
      setActiveIndex(newIndex);
    },
    [loop, totalSlides]
  );
  if (totalSlides === 0) return null;

  const containerWidth = (totalSlides / horizontalCount) * 100;

  return (
    <SectionWrapper className={cn("relative h-svh", className)} id="media">
      <div className="relative w-full overflow-hidden h-full">
        {/* ✅ SLIDE WRAPPER */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            width: `${containerWidth}%`,
            transform: `translateX(-${(activeIndex * 100) / totalSlides}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={`media-slide-${index}-${slide.id}`}
              className={cn("relative flex-shrink-0 h-full ", slide.className)}
              style={{ width: `${100 / totalSlides}%` }}
            >
              <FullscreenSlide
                {...slide}
                showBottomFade={showBottomFade ?? slide.showBottomFade}
                showSliderIndicators={sliderIndicatorVisible}
              />
            </div>
          ))}
        </div>

        {/* ✅ INDICATORS */}
        {sliderIndicatorVisible && (
          <div
            className={cn(
              "absolute bottom-1 left-0 right-0 z-30 mb-4 fw-content-wrapper",
              sliderIndicatorClassName
            )}
          >
            <HorizontalSlideIndicators
              slides={slides}
              count={totalSlides - (horizontalCount - 1)}
              activeIndex={activeIndex}
              onSlideChange={handleSlideChange}
              loop={loop}
              fullWidth={!roundedIndicators}
              barGap={10}
              withBgImage={indicatorShowBg}
              autoplay={autoplay}
              isRounded={roundedIndicators}
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
