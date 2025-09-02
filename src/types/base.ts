import { ReactNode, CSSProperties } from "react";

export type Merge<T, U> = Omit<T, keyof U> & U;

export type BaseComponentProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = Record<string, any>
> = Merge<
  {
    children?: ReactNode;
    className?: string;
    id?: string;
    style?: CSSProperties;
    isDark?: boolean;
  },
  T
>;

/* A wrapper for the NextI18n translate function that parses  */
// export type SWTranslateFx = (
//   key: string,
//   options?: Record<string, any>
// ) => ReturnType<typeof parse>;
// export type SWTranslateFx = (
//   key: string,
//   options?:
//     | Record<string, string | number | Date>
//     | {
//         values?: Record<string, string | number | Date>;
//         components?: Record<
//           string,
//           (chunks: React.ReactNode) => React.ReactNode
//         >;
//       }
// ) => React.ReactNode | React.ReactNode[];

// export type UseSWTranslateType = (namespace?: string) => {
//   t: SWTranslateFx;
//   tPlain: SWTranslateFx;
//   i18n: string;
// };
