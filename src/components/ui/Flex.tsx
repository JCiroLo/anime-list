import React from "react";
import { useClsx } from "../../hooks";

export type TFlex = React.FC<{
  children: React.ReactNode;
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "normal" | "start" | "center" | "end" | "between" | "around" | "evenly" | "stretch";
  wrap?: "wrap" | "nowrap";
  gap?: number;
}>;

const tailwind = {
  direction: {
    row: "flex-row",
    column: "flex-col",
  },
  align: {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
    stretch: "items-stretch",
  },
  justify: {
    normal: "justify-normal",
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
    stretch: "justify-stretch",
  },
  wrap: {
    wrap: "flex-wrap",
    nowrap: "flex-nowrap",
  },
};

const Flex: TFlex = ({ children, direction = "column", align = "stretch", justify = "normal", gap = 1, wrap = "wrap" }) => {
  const className = useClsx("flex", tailwind.direction[direction], tailwind.align[align], tailwind.justify[justify], tailwind.wrap[wrap]);

  return (
    <div className={className} style={{ gap: `${gap * 8}px` }}>
      {children}
    </div>
  );
};

export default Flex;
