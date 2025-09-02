"use client";
import { useEffect, useState } from "react";

export function useSwipePageCount(containerId: string = "swipe-shell") {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const parent = document.getElementById(containerId);
    if (!parent) return;

    const update = () => {
      const nodes = parent.querySelectorAll("[data-page]");
      setCount(nodes.length);
    };

    update(); // initial
    const observer = new MutationObserver(update);
    observer.observe(parent, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [containerId]);

  return count;
}
