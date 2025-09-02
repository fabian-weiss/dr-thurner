"use client";
import React, { useState } from "react";
import { BaseComponentProps } from "@/types/base";
import { AccordionItemType } from "@/types/AccordionItemType";
import { cn } from "@/utils/cn";

interface AccordionProps {
  title?: string;
  items: AccordionItemType[];
}

function AccordionGroup({
  title,
  items,
  className,
}: BaseComponentProps<AccordionProps>) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("flex flex-col lg:gap-4 ", className)}>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {items.map((item, index) => (
        <div
          // initial={{ y: 20, opacity: 0 }}
          // whileInView={{ y: 0, opacity: 1 }}
          // transition={{ ease: "easeInOut", duration: 0.25, delay: index * 0.1 }}

          key={item.id}
        >
          <button
            onClick={() => toggle(index)}
            className="flex justify-between w-full py-4 text-left font-medium cursor-pointer"
          >
            <p className="text-inherit text-h5">{item.title}</p>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="pb-4">{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AccordionGroup;
