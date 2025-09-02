import { BaseComponentProps } from "@/types/base";
import { cn } from "@/utils/cn";
import React from "react";

export default function ContentWrapper({
  children,
  className,
}: BaseComponentProps) {
  return (
    <div className={cn("fw-content-wrapper fw-py-section", className)}>
      {children}
    </div>
  );
}
