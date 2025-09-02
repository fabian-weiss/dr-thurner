import { BaseComponentProps } from "@/types/base";
import { cn } from "@/utils/cn";
import React from "react";

type InfoBoxProps = {
  title: string;
  description?: string;
  headerBoxClassName?: string;
};

export default function InfoBox({
  title,
  description,
  children,
  className,
  headerBoxClassName,
}: BaseComponentProps<InfoBoxProps>) {
  return (
    <div className={cn(`flex flex-col gap-2 overflow-hidden`, className)}>
      <div className={cn("p-6", headerBoxClassName)}>
        <p className={cn("text-h4")}>{title}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
