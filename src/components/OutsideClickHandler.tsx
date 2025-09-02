"use client";

import { useRef, useEffect } from "react";

function OutsideClickHandler(props: {
  children: React.ReactNode[] | React.ReactNode;
  onOutsideClick: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        // Click occurred outside the element
        props.onOutsideClick();
      }
    };

    // Attach the event listener on component mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onOutsideClick]);

  return <div ref={wrapperRef}>{props.children}</div>;
}

export default OutsideClickHandler;
