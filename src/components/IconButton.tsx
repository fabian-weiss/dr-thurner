import { BaseComponentProps } from "@/types/base";
import { cn } from "@/utils/cn";
import React from "react";

export type IconButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export default function IconButton({
  children,
  onClick,
  className,
  disabled,
}: BaseComponentProps<IconButtonProps>) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `rounded-full h-max p-2 aspect-square bg-secondary hover:bg-secondary-hover disabled:bg-secondary-disabled text-primary flex items-center cursor-pointer justify-center`,
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
