// components/SectionWrapper.tsx
import React from "react";
import { cn } from "@/utils/cn";
import { BaseComponentProps } from "@/types/base";

type SectionProps = {
  children?: React.ReactNode;
};

function SectionWrapper({
  className,
  id,
  children,
  isDark = false, // comes from BaseComponentProps already
}: BaseComponentProps<SectionProps>) {
  return (
    <div
      id={id}
      data-is-dark={isDark}
      className={cn("relative h-full w-full text-text-dark", className, {
        "bg-bg-dark text-text-light": isDark,
        "bg-bg-light text-text-dark": !isDark,
      })}
    >
      {children}
    </div>
  );
}

export default SectionWrapper;
