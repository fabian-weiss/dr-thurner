"use client";
import { useMenuStore } from "@/hooks/useMenuStore";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

type AnimatedMenuButtonProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const AnimatedMenuButton = ({
  className,
  style,
  onClick,
}: AnimatedMenuButtonProps) => {
  const { isOpen, toggle } = useMenuStore();

  return (
    <button
      onClick={() => {
        toggle();
        onClick?.();
      }}
      aria-label="Menu"
      className={cn(
        "relative w-8 h-8 flex items-center justify-center cursor-pointer  rounded-full",
        className
      )}
      style={style}
    >
      {/* Top bar */}
      <motion.span
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: {
            rotate: 0,
            y: -6,
          },
          open: {
            rotate: 45,
            y: 0,
          },
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute w-6 h-0.5 bg-current"
      />

      {/* Bottom bar */}
      <motion.span
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: {
            rotate: 0,
            y: 6,
          },
          open: {
            rotate: -45,
            y: 0,
          },
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute w-6 h-0.5 bg-current"
      />
    </button>
  );
};
