"use client";
import { ButtonType } from "@/types/ButtonType";
import React from "react";
import Button from "./Button";
import { BaseComponentProps } from "@/types/base";
import { cn } from "@/utils/cn";
import { PiX } from "react-icons/pi";
import { motion } from "framer-motion";
import { SmartLink } from "./shared/SmartLink";

export type ContentCardProps = {
  header?: React.ReactNode; // Optional header content
  icon?: React.ReactNode; // Optional icon content
  url?: string; // Optional URL for the card
  title?: string;
  description?: string;
  footer?: string;
  button?: ButtonType;
  background?: string;
  enableHoverEffect?: boolean; // Optional prop to enable hover effect
  enableFullscreenExpansion?: boolean; // Optional prop to enable fullscreen expansion on click
  hideDescription?: boolean; // Optional prop to hide description when not expanded
  showOverlay?: boolean; // Optional prop to show overlay
};

function ContentCard({
  header,
  icon,
  url,
  title,
  description,
  button,
  background,
  className,
  enableHoverEffect = true,
  enableFullscreenExpansion = false,
  hideDescription = false,
  children, // Additional (absolute) children
  footer,
  showOverlay = false, // Optional prop to show overlay
}: BaseComponentProps<ContentCardProps>) {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  // Determine if the card should be <a> for external links <div> for no link or <Link> for internal links
  // const isExternalLink: boolean = url ? /^https?:\/\//.test(url) : false;
  // const CardComponent: React.ElementType = isExternalLink
  //   ? "a"
  //   : url
  //   ? Link
  //   : "div";
  // const linkProps = url
  //   ? {
  //       href: url,
  //       target: isExternalLink ? "_blank" : undefined,
  //       rel: isExternalLink ? "noopener noreferrer" : undefined,
  //     }
  //   : {};
  return (
    <SmartLink
      href={url}
      className={cn(className, "relative overflow-hidden p-6 text-text-light", {
        "transform hover:scale-101 duration-200":
          enableHoverEffect && !isExpanded,
        "cursor-pointer": enableFullscreenExpansion,
        "fixed top-0 left-0 z-50 h-dvh w-screen": isExpanded,
        "rounded-2xl lg:rounded-2xl": !isExpanded,
      })}
      style={{
        background,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => {
        if (enableFullscreenExpansion && !url) setIsExpanded(!isExpanded);
      }}
    >
      {/* ✅ overlay sits behind everything */}
      {showOverlay && (
        <div
          className="absolute inset-x-0 bottom-0 z-0 h-1/2 pointer-events-none
                    bg-gradient-to-b from-transparent to-text-dark"
        />
      )}

      {/* ✅ content is above overlay */}
      <div className="relative z-10">
        {header && <div className="mb-4">{header}</div>}
        {icon && <div className="mb-4">{icon}</div>}

        <span className="flex flex-col gap-2">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {description && (isExpanded || !hideDescription) && (
            <motion.p
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {description}
            </motion.p>
          )}
          {footer && (
            <span className="text-sm text-text-secondary">{footer}</span>
          )}
        </span>

        {button && <Button className="mt-4 lg:mt-0 lg:w-max" {...button} />}
        {children}
      </div>

      {isExpanded && (
        <button
          type="button"
          className="absolute right-0 top-0 z-20 cursor-pointer p-4"
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(false);
          }}
          aria-label="Close"
        >
          <PiX size={24} />
        </button>
      )}
    </SmartLink>
  );
}
export default ContentCard;
