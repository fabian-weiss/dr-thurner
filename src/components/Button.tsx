"use client";

import React from "react";
import { BaseComponentProps } from "@/types/base";
import { ButtonType } from "@/types/ButtonType";

import { Link } from "@/i18n/navigation";
import Spinner from "./Spinner";

export default function Button({
  children,
  href,
  appearance = "primary",
  iconLeft,
  iconRight,
  size = "sm",
  className = "",
  disabled = false,
  target = "_self",
  onClick,
  style: styleProp,
  isLoading = false,
  buttonType,
  disableLineBreak = false,
  forceDiv = false,
  ...rest
}: BaseComponentProps<ButtonType>) {
  const isInternalLink = Boolean(href && href.startsWith("/"));
  const isExternalLink = Boolean(href && !href.startsWith("/"));

  const onPress = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled && !isLoading) {
      onClick?.(e);
    }
  };

  const renderContent = (
    <>
      {isLoading && <Spinner />}
      {!isLoading && iconLeft && <span className="mr-2">{iconLeft}</span>}
      {!isLoading && <span>{children}</span>}
      {!isLoading && iconRight && <span className="ml-2">{iconRight}</span>}
    </>
  );

  const combinedClassName = [
    disableLineBreak ? "" : "whitespace-break-spaces",
    "button",
    `button--${appearance}`,
    `button--${size}`,
    disabled ? "is-disabled" : "",
    isLoading ? "is-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const commonProps = {
    className: combinedClassName,
    style: {
      WebkitTapHighlightColor: "transparent",
      ...styleProp,
    },
    ...rest,
  };

  if (forceDiv) {
    return <div {...commonProps}>{renderContent}</div>;
  }

  if (isInternalLink) {
    return (
      <Link href={href!} {...commonProps}>
        {renderContent}
      </Link>
    );
  }

  if (isExternalLink) {
    return (
      <a href={href} target={target} {...commonProps} onClick={onPress}>
        {renderContent}
      </a>
    );
  }

  return (
    <button
      type={buttonType ?? "button"}
      disabled={disabled}
      {...commonProps}
      onClick={onPress}
    >
      {renderContent}
    </button>
  );
}
