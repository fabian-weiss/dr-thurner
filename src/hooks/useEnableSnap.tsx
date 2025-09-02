"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";

export function useEnableSnap() {
  const [enableSnap, setEnableSnap] = useState(false);
  const pathname = usePathname();

  const forceDisablePaths: string[] = [];
  const FORCE_DISABLE = forceDisablePaths.includes(pathname); // Set to true to disable snap regardless of dimensions

  useEffect(() => {
    const checkDimensions = () => {
      if (FORCE_DISABLE) {
        setEnableSnap(false);
        return;
      }
      const width = window.innerWidth;
      const height = window.innerHeight;

      const shouldEnable = height > 600 || (height <= 600 && width < height);
      setEnableSnap(shouldEnable);
    };

    // Initial check
    checkDimensions();

    // Listen to resize
    window.addEventListener("resize", checkDimensions);
    return () => window.removeEventListener("resize", checkDimensions);
  }, []);

  return enableSnap;
}
