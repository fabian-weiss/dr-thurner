export interface ButtonType {
  href?: string;
  appearance?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "outlined"
    | "link";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  size?: "sm" | "lg";
  className?: string;
  disabled?: boolean;
  target?: "_blank" | "_self" | "_phone" | "_mailto";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  isLoading?: boolean;
  focusRingClassName?: string;
  ariaDescribedBy?: string;
  buttonType?: "button" | "submit" | "reset";
  externalLink?: boolean;
  disableLineBreak?: boolean;
  forceDiv?: boolean;
  children: React.ReactNode;
}
