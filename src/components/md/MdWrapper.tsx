import { MdPageType } from "@/types/MdPageType";
import Image from "next/image";
import React from "react";
import { mdWithBreaks } from "@/utils/md-with-breaks";
import SectionWrapper from "../SectionWrapper";
import { cn } from "@/utils/cn";
import MdElement from "./MdElement";
import { Link } from "@/i18n/navigation";
import Logo, { LogoProps } from "../Logo";

function MdWrapper(props: {
  content: MdPageType;
  html: string;
  href?: string;
  className?: string;
  logo?: LogoProps;
  isDark?: boolean;
}) {
  return (
    <SectionWrapper
      isDark={props.isDark}
      className={cn("w-screen", props.className)}
    >
      <div className="h-[var(--navbar-height)] fw-content-wrapper flex items-center">
        {props.logo && (
          <Link href="/" className="flex items-center">
            {<Logo {...props.logo} />}
          </Link>
        )}
      </div>
      <div className="fw-content-wrapper flex flex-col gap-4 lg:gap-6 pt-4">
        {/* Title */}
        {props.content.title && (
          <h2 className="max-w-[900px]">{props.content.title}</h2>
        )}

        {/* Image */}
        {props.content.imageSrc && (
          <Image
            className="w-full h-[300px] rounded-[var(--border-radius-l)] object-cover overflow-hidden"
            src={props.content.imageSrc}
            alt={props.content.imageAlt ?? ""}
            width={800}
            height={400}
            priority
          />
        )}

        {/* Subtitle */}
        {props.content.subtitle && (
          <p className="max-w-[900px]">{props.content.subtitle}</p>
        )}

        {/* Markdown */}
        <MdElement
          className={cn(
            "w-full max-w-[900px]",
            // markdown-specific resets
            "[&>h1]:pt-[30px] [&>h2]:pt-[30px] [&>h2]:mb-2 [&>h3]:pt-[30px] [&>h3]:mb-2 [&>h4]:pt-[30px] [&>h4]:mb-2 [&>h5]:pt-[15px] [&>h5]:pb-[5px]",
            "[&_a]:underline",
            "[&_table]:w-full [&_table]:border-collapse",
            "[&_th]:border [&_td]:border [&_th]:border-[#ccc] [&_td]:border-[#ccc]",
            "[&_th]:bg-[#f7f7f7] [&_th]:p-2 [&_td]:p-2 [&_th]:text-left [&_td]:text-left",
            "[&_td:first-child]:max-w-[280px] [&_td:first-child]:pr-2",
            "[&_table]:[hyphens:auto] [&_table]:[-webkit-hyphens:auto] [&_table]:[word-break:break-word] [&_table]:[overflow-wrap:break-word]"
          )}
          markdown={mdWithBreaks(props.html)}
        />
      </div>
    </SectionWrapper>
  );
}

export default MdWrapper;
