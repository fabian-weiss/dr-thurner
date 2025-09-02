"use client";

import { FC, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/utils/cn";
interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number;
  showOutline?: boolean;
  className?: string;
}

export const MagneticWrapper: FC<MagneticWrapperProps> = ({
  children,
  strength = 0.2,
  showOutline = false,
  className,
}) => {
  const { ref, position, handleMouseMove, resetPosition } = useMagnetic({
    strength,
  });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        handleMouseMove(e);
        if (!isHovered) setIsHovered(true);
      }}
      onMouseLeave={() => {
        resetPosition();
        setIsHovered(false);
      }}
      animate={position}
      transition={{
        ease: [0.33, 1, 0.68, 1],
        duration: 0.5,
      }}
      className="inline-block cursor-pointer will-change-transform"
    >
      <div
        className={cn(
          `relative transition-all duration-200`,
          // showOutline && isHovered
          //   ? "rounded-full border border-dashed border-gray-400"
          //   : "",
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};
