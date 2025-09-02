import { BaseComponentProps } from "@/types/base";
import Link from "next/link";
import React from "react";

interface SmartLinkProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  children: React.ReactNode;
}

export function SmartLink({
  href,
  children,
  className,
  style,
  onClick,
}: BaseComponentProps<SmartLinkProps>) {
  if (!href) {
    return (
      <div onClick={onClick} style={style} className={className}>
        {children}
      </div>
    );
  }

  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        onClick={onClick}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <Link onClick={onClick} href={href} className={className} style={style}>
      {children}
    </Link>
  );
}
