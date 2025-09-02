import { BaseComponentProps } from "@/types/base";
import { cn } from "@/utils/cn";
import React from "react";

type BubbleProps = {
  text: string;
  prefix?: React.ReactNode;
  border?: boolean;
};

export default function Bubble({
  text,
  prefix,
  border,
  className,
}: BaseComponentProps<BubbleProps>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center  rounded-full",
        className,
        {
          "border border-primary px-4 py-2": border,
        }
      )}
    >
      {prefix && <span className="mr-2">{prefix}</span>}
      {text}
    </div>
  );
}
