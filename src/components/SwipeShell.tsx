// SwipeShell.tsx
"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSwipeStore } from "@/store/useSwipeStore";
import { useEnableSnap } from "@/hooks/useEnableSnap";
import { cn } from "@/utils/cn";
import { BaseComponentProps } from "@/types/base";

type Props = BaseComponentProps & {
  id?: string;
  initialPage?: number; // can be 0
};

export default function SwipeShell({ children, id, initialPage }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { setCurrentPage, setScrollDir, currentPage } = useSwipeStore();
  const [isOverflowing, setIsOverflowing] = useState<boolean[]>([]);
  const [didInit, setDidInit] = useState(false);

  const enableSnap = useEnableSnap();

  // map isDark per child
  const isDarkByIndex = useMemo<boolean[]>(
    () =>
      React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? Boolean((child.props as { isDark?: boolean })?.isDark)
          : false
      ) ?? [],
    [children]
  );

  const resolveIsDark = (idx: number, el?: Element | null) => {
    const attr = el?.getAttribute?.("data-is-dark");
    return attr != null ? attr === "true" : Boolean(isDarkByIndex[idx]);
  };

  // --- 1) Scroll to initialPage BEFORE attaching observers/listeners
  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    if (initialPage == null) return; // allow 0
    const target = sectionRefs.current[initialPage];
    if (!target) return;

    // scroll container to the section
    root.scrollTo({ top: target.offsetTop, behavior: "auto" });
    // reflect in store immediately
    setCurrentPage(initialPage, resolveIsDark(initialPage, target));
    setDidInit(true);
  }, [initialPage, setCurrentPage]);

  // --- 2) Track current page – use the CONTAINER as the scroll root everywhere
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // delay setup until after the initial scroll
    if (!didInit) return;

    const sections = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
    if (sections.length === 0) return;

    // SNAP MODE: IntersectionObserver with root = container
    if (enableSnap) {
      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!visible) return;
          const idx = parseInt(
            visible.target.getAttribute("data-page") || "0",
            10
          );
          setScrollDir(null);
          if (idx !== currentPage) {
            setCurrentPage(idx, resolveIsDark(idx, visible.target));
          }
        },
        { root, threshold: 0.6 }
      );

      sections.forEach((s) => io.observe(s));
      return () => io.disconnect();
    }

    // NO-SNAP MODE: listen on the CONTAINER, not document/window
    let ticking = false;
    let lastY = root.scrollTop;

    const computeIndexFromOffsets = () => {
      const y = root.scrollTop + 1; // bias to avoid fencepost at exact boundaries
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        const top = sections[i].offsetTop;
        const nextTop =
          i + 1 < sections.length ? sections[i + 1].offsetTop : Infinity;
        if (y >= top && y < nextTop) {
          idx = i;
          break;
        }
      }
      return idx;
    };

    const readAndUpdate = () => {
      const idx = computeIndexFromOffsets();
      if (idx !== currentPage) {
        setCurrentPage(idx, resolveIsDark(idx, sections[idx]));
      }
      lastY = root.scrollTop;
    };

    const onScroll = () => {
      const y = root.scrollTop;
      setScrollDir(y > lastY ? "down" : "up");
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          readAndUpdate();
          ticking = false;
        });
      }
    };

    // initial sync after init
    readAndUpdate();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", readAndUpdate);
    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", readAndUpdate);
    };
  }, [
    didInit,
    enableSnap,
    setCurrentPage,
    setScrollDir,
    currentPage,
    isDarkByIndex,
  ]);

  // --- 3) Overflow calc: run after layout & be strict to avoid false positives
  useEffect(() => {
    const calc = () => {
      const arr = sectionRefs.current.map((el) => {
        if (!el) return false;
        const target =
          el.querySelector<HTMLElement>("[data-inner-scroll]") || el;
        return target.scrollHeight - target.clientHeight > 2;
      });
      setIsOverflowing(arr);
    };
    let raf = requestAnimationFrame(calc);
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    });
    sectionRefs.current.forEach((el) => el && ro.observe(el));
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [children]);

  return (
    <div
      id={id ?? "swipe-shell"}
      ref={containerRef}
      className={cn(
        "w-screen h-dvh overflow-y-auto touch-pan-y", // container is the only scroller
        { "snap-y snap-mandatory": enableSnap }
      )}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {React.Children.map(children, (child, index) => {
        const isDark = isDarkByIndex[index] ?? false;
        const overflowing = isOverflowing[index] && enableSnap;

        return (
          <div
            key={index}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            data-page={index}
            data-is-dark={isDark}
            className={cn({
              "snap-center": enableSnap && !overflowing,
              "min-h-dvh w-full flex items-stretch justify-stretch": enableSnap,
            })}
          >
            <div
              data-inner-scroll
              className={cn("w-full", {
                "max-h-dvh overflow-y-auto overscroll-y-auto [scroll-snap-align:none]":
                  overflowing,
                "h-full": enableSnap,
              })}
            >
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
}
