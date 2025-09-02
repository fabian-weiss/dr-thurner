// store/useSwipeStore.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ScrollDir = "up" | "down" | null;

interface SwipeStore {
  // keep the old fields for backward compat
  currentPage: number;
  previousPage: number;
  isDark: boolean;
  scrollDir: ScrollDir;

  // NEW: remembered page per route (or per slider key)
  rememberedByKey: Record<string, number>;

  setCurrentPage: (index: number, isDark?: boolean) => void;

  // NEW helpers
  setRememberedPage: (key: string, index: number) => void;
  getRememberedPage: (key: string) => number | undefined;

  setScrollDir: (dir: ScrollDir) => void;
}

export const useSwipeStore = create<SwipeStore>()(
  persist(
    (set, get) => ({
      currentPage: 0,
      previousPage: 0,
      isDark: false,
      scrollDir: null,

      rememberedByKey: {},

      setCurrentPage: (index, isDark) => {
        const prev = get().currentPage;
        if (prev !== index) {
          set({
            currentPage: index,
            previousPage: prev,
            isDark: isDark ?? get().isDark,
          });
        }
      },

      setRememberedPage: (key, index) => {
        const map = get().rememberedByKey;
        if (map[key] !== index) {
          set({ rememberedByKey: { ...map, [key]: index } });
        }
      },

      getRememberedPage: (key) => get().rememberedByKey[key],

      setScrollDir: (dir) => set({ scrollDir: dir }),
    }),
    {
      name: "swipe-store",
      version: 1,
      storage: createJSONStorage(() => sessionStorage), // survive page transitions, reset on full browser close
      // only persist what you need
      partialize: (state) => ({
        rememberedByKey: state.rememberedByKey,
      }),
    }
  )
);
