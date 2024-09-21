import React from "react";
import { useTheme } from "@mui/material";

import type { Duration, Easing } from "@mui/material";

type TUseTransitionsOption = {
  duration?: keyof Duration;
  ease?: keyof Easing;
  delay?: number;
};
type TUseTransitions = (options: Record<string, TUseTransitionsOption>) => string;

const useTransitions: TUseTransitions = (options) => {
  const theme = useTheme();

  const transition = React.useMemo(
    () =>
      Object.entries(options)
        .map(([key, value]) => {
          const property = key;
          const duration = theme.transitions.duration[value.duration || "standard"];
          const ease = theme.transitions.easing[value.ease || "easeInOut"];
          const delay = value.delay ?? 0;

          return [property, `${duration}ms`, ease, `${delay}ms`].join(" ");
        })
        .join(", "),
    [options, theme]
  );

  return transition;
};

export default useTransitions;