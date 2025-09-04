import { getResponsiveClasses, ResponsiveValue } from "@/lib/responsive-helper";
import React, { HTMLAttributes } from "react";

// Tailwind class mappings
const directionClasses = {
  row: "flex-row",
  col: "flex-col",
  rowReverse: "flex-row-reverse",
  colReverse: "flex-col-reverse",
} as const;

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const;

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

// Props interface
interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: ResponsiveValue<keyof typeof directionClasses>;
  justify?: ResponsiveValue<keyof typeof justifyClasses>;
  align?: ResponsiveValue<keyof typeof alignClasses>;
  gap?: ResponsiveValue<number>;
}

const Flex: React.FC<FlexProps> = ({
  children,
  direction = "row",
  justify = "start",
  align = "stretch",
  gap = 0,
  className = "",
  ...rest
}) => {
  const classes = [
    "flex",
    getResponsiveClasses(direction, directionClasses),
    getResponsiveClasses(justify, justifyClasses),
    getResponsiveClasses(align, alignClasses),
    getResponsiveClasses(gap, undefined, "gap-"),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Flex;
