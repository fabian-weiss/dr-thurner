import { ElementType } from "react";
import { ButtonType } from "./ButtonType";

export enum RichTextLayout {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export enum RichTextSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

export type RichTextType = {
  topline?: string;
  title?: string;
  description?: string;
  content?: React.ReactNode;
  buttons?: ButtonType[];
  buttonsFirst?: boolean;
  layoutType?: RichTextLayout;
  titleAs?: ElementType;
  toplineAs?: ElementType;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  size?: RichTextSize;
};
