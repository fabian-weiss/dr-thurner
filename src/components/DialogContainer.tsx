"use client";
import { PiXBold } from "react-icons/pi";
import { useEffect, useRef } from "react";
import OutsideClickHandler from "./OutsideClickHandler";
import { cn } from "@/utils/cn";

function DialogContainer(props: {
  children: React.ReactNode;
  title?: string;
  body?: string;
  fullscreen?: boolean;
  closeDialog: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollBy(0, -10000);
    }
  }, []);

  const dialogContainer = (): React.ReactNode => {
    return (
      <div
        className={cn(
          "max-w-[800px] absolute md:relative bottom-0 left-0 min-w-[60vw] lg:min-w-[30vw] h-max w-full flex flex-col gap-5 bg-primary py-[30px] px-[40px] rounded-t-xl lg:rounded-xl overflow-visible cursor-auto items-start",
          {
            "max-w-[1400px] h-auto max-h-none py-[60px] px-[30px] bg-transparent justify-start":
              props.fullscreen,
          }
        )}
      >
        <PiXBold
          size={22}
          className={cn(
            `cursor-pointer absolute top-5 right-5 md:top-8 md:right-8 transform z-15`,
            {
              fixed: props.fullscreen,
            }
          )}
          onClick={() => props.closeDialog()}
        />
        {props.children}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={cn(
        "w-screen h-full min-h-[100svh] fixed top-0 left-0 py-[30px] px-[60px] bg-black/50 flex flex-col items-center justify-center z-[99] cursor-pointer overflow-y-auto overflow-x-hidden",
        {
          "bg-[var(--background)] cursor-auto": props.fullscreen,
        }
      )}
    >
      {props.fullscreen ? (
        <>{dialogContainer()}</>
      ) : (
        <OutsideClickHandler onOutsideClick={() => props.closeDialog()}>
          {dialogContainer()}
        </OutsideClickHandler>
      )}
    </div>
  );
}

export default DialogContainer;
