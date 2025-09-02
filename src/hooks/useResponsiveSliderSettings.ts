"use client";
import { useEffect, useState } from "react";

export function useResponsiveSliderSettings(maxVisibleSlides: number) {
  const [settings, setSettings] = useState({
    visibleSlides: 4,
    teaserOffset: 0.0,
  });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSettings({
          visibleSlides: Math.min(maxVisibleSlides, 1),
          teaserOffset: 0.15,
        });
      } else if (width < 1100) {
        setSettings({
          visibleSlides: Math.min(maxVisibleSlides, 2),
          teaserOffset: 0.2,
        });
      } else {
        setSettings({
          visibleSlides: Math.min(maxVisibleSlides, 5),
          teaserOffset: 0.1,
        });
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [maxVisibleSlides]);

  return settings;
}
