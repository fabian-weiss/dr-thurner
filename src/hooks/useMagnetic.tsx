import { useRef, useState } from "react";

interface MagneticConfig {
  strength?: number; // How far it moves
}

export const useMagnetic = ({ strength = 0.2 }: MagneticConfig = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * strength, y: y * strength });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return {
    ref,
    position,
    handleMouseMove,
    resetPosition,
  };
};
