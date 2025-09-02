"use client";
import Image from "next/image";
import React from "react";

export type LogoProps = {
  src: string;
  srcDark?: string;
  isDark: boolean;
  alt?: string;
};

export default function Logo({
  src,
  srcDark,
  isDark = false,
  alt = "Logo",
}: LogoProps) {
  return (
    <div className="w-30">
      <Image
        src={isDark && srcDark ? srcDark : src}
        alt={alt}
        width={200}
        height={40}
        className="w-auto h-15 lg:h-20 object-contain"
        priority
      />
    </div>
  );
}
