// hooks/useCloseMenuOnDesktop.ts
import { useEffect } from "react";
import { useMenuStore } from "@/hooks/useMenuStore";

export function useCloseMenuOnDesktop(minWidthPx = 768) {
  const isOpen = useMenuStore((s) => s.isOpen);
  const close = useMenuStore((s) => s.close);

  useEffect(() => {
    if (!isOpen) return;

    const mql = window.matchMedia(`(min-width: ${minWidthPx}px)`);
    const maybeClose = () => {
      if (mql.matches) close();
    };

    maybeClose(); // close immediately if already wide

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [isOpen, close, minWidthPx]);
}
