"use client";

import { useEffect, useRef, useState, ReactNode, useCallback } from "react";

import clsx from "clsx";
import { useResponsiveSliderSettings } from "@/hooks/useResponsiveSliderSettings";
import { cn } from "@/utils/cn";
import IconButton from "./IconButton";

interface CustomCarouselProps {
  children: ReactNode[];
  className?: string;
  dotsClassName?: string;
  dotColor?: string;
  activeDotColor?: string;
  useDots?: boolean;
  autoSlide?: boolean;
  slideInterval?: number;
  centerDots?: number;
  customLeftArrow?: ReactNode;
  customRightArrow?: ReactNode;
  ignoreTeaserOffset?: boolean;
  fixedVisibleSlides?: number;
  infinite?: boolean;
  showArrows?: boolean;
  maxVisibleSlides?: number; // Optional prop to set max visible slides
  enableSnap?: boolean; // Optional prop to enable snap scrolling
  arrowPosition?: "floating" | "bottom";
}

export default function CustomCarousel({
  children,
  className,
  autoSlide = false,
  slideInterval = 5000,
  customLeftArrow,
  customRightArrow,
  ignoreTeaserOffset = false,
  fixedVisibleSlides,
  infinite = true,
  showArrows = true,
  maxVisibleSlides = 3,
  enableSnap = true,
  arrowPosition = "floating",
}: CustomCarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const { visibleSlides: vs, teaserOffset: tOffset } =
    useResponsiveSliderSettings(maxVisibleSlides);
  const gapPx = 24;

  const visibleSlides = fixedVisibleSlides ?? vs;
  const onePager = visibleSlides >= children.length;
  // console.log(
  //   "visibleSlides",
  //   visibleSlides,
  //   "children.length",
  //   children.length
  // );
  const teaserOffset = ignoreTeaserOffset || onePager ? 0 : tOffset;

  const updateContainerWidth = useCallback(() => {
    if (sliderRef.current) {
      setContainerWidth(sliderRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const width = el.clientWidth;
      if (width > 0) {
        setContainerWidth(width);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const childrenArray = Array.isArray(children) ? children : [children];
  const totalSlides = childrenArray.length;

  const getSlideWidth = () =>
    (containerWidth * (1 - (ignoreTeaserOffset ? 0 : teaserOffset)) -
      gapPx * (visibleSlides - 1)) /
    visibleSlides;

  const slidePx = getSlideWidth();

  const scrollSteps = Math.max(1, Math.ceil(totalSlides - visibleSlides + 1));

  const handleScroll = (forward: boolean) => {
    if (!sliderRef.current) return;

    let newIndex = forward ? currentSlide + 1 : currentSlide - 1;

    if (infinite) {
      if (newIndex >= scrollSteps) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = scrollSteps - 1;
      }
    } else {
      newIndex = Math.max(0, Math.min(newIndex, scrollSteps - 1));
    }

    sliderRef.current.scrollTo({
      left: newIndex * (slidePx + gapPx),
      behavior: "smooth",
    });

    setCurrentSlide(newIndex);
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (autoSlide) {
      intervalRef.current = setInterval(
        () => handleScroll(true),
        slideInterval
      );
    }
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSlide, autoSlide, slideInterval]);

  useEffect(() => {
    const handleScrollEvent = () => {
      if (!sliderRef.current) return;
      const scrollLeft = sliderRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / (slidePx + gapPx));
      setCurrentSlide(newIndex);
    };

    const el = sliderRef.current;
    el?.addEventListener("scroll", handleScrollEvent, { passive: true });
    return () => el?.removeEventListener("scroll", handleScrollEvent);
  }, [containerWidth, visibleSlides]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateContainerWidth();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  if (containerWidth === 0) {
    return (
      <div
        ref={sliderRef}
        className="w-full h-[1px] opacity-0 pointer-events-none"
      />
    );
  }

  const sidePad =
    ignoreTeaserOffset || onePager ? 0 : window.innerWidth > 768 ? 56 : 28;

  return (
    <div className={`relative w-full min-w-0 ${className} flex flex-col`}>
      <div
        ref={sliderRef}
        className={cn(
          "flex overflow-x-auto no-scrollbar gap-6 w-full min-w-0",
          {
            "snap-x snap-mandatory": enableSnap,
          }
        )}
        style={{
          minHeight: "1px",
          paddingLeft: sidePad,
          paddingRight: sidePad,
          // help CSS scroll snapping start/stop within the padded area
          scrollPaddingLeft: enableSnap ? sidePad : undefined,
          scrollPaddingRight: enableSnap ? sidePad : undefined,
        }}
      >
        {children
          .filter((child) => child != null)
          .map((child, idx) => {
            return (
              <div
                key={idx}
                className={clsx(`shrink-0 snap-center`, {
                  "snap-start": visibleSlides % 2 === 0,
                })}
                style={{
                  width: `${slidePx}px`,
                  minHeight: "1px",
                  // marginLeft: isFirst ? `${marginLeft}px` : undefined,
                  // marginRight: isLast ? `${marginRight}px` : undefined,
                }}
              >
                <div className="w-full h-full">{child}</div>
              </div>
            );
          })}
        {/* {visibleSlides < totalSlides && !ignoreTeaserOffset && (
          <div className="shrink-0 w-4" aria-hidden />
        )} */}
      </div>
      {arrowPosition === "bottom" && (
        <div className="flex gap-2 mt-4 pr-4 w-full justify-end">
          <IconButton
            className={`cursor-pointer bg-secondary`}
            onClick={() => handleScroll(false)}
          >
            {customLeftArrow}
          </IconButton>
          <IconButton
            className={`cursor-pointer `}
            onClick={() => handleScroll(true)}
          >
            {customRightArrow}
          </IconButton>
        </div>
      )}

      {arrowPosition === "floating" && (
        <>
          {customLeftArrow && showArrows && (
            <IconButton
              className={`absolute left-[24px] top-1/2 -translate-y-1/2 z-10 cursor-pointer ${
                currentSlide === 0 ? "hidden" : ""
              }`}
              onClick={() => handleScroll(false)}
            >
              {customLeftArrow}
            </IconButton>
          )}
          {customRightArrow && showArrows && (
            <IconButton
              className={`absolute right-[24px] top-1/2 -translate-y-1/2 z-10 cursor-pointer ${
                currentSlide === scrollSteps - 1 ? "hidden" : ""
              }`}
              onClick={() => handleScroll(true)}
            >
              {customRightArrow}
            </IconButton>
          )}
        </>
      )}
    </div>
  );
}
