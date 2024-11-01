import type { Breakpoint } from "@mui/material";

type TBreakpointsUtils = {
  exclude(breakpoints: Record<Breakpoint, number>, exclusions: Breakpoint[]): Partial<Record<Breakpoint, number>>;
};

const BreakpointsUtils: TBreakpointsUtils = {
  exclude(breakpoints, exclusions) {
    const { xs, sm, md, lg, xl } = breakpoints;

    return exclusions.reduce(
      (values: Partial<Record<Breakpoint, number>>, breakpoint) => {
        const { [breakpoint]: _, ...rest } = values;
        return rest;
      },
      { xs, sm, md, lg, xl }
    );
  },
};

export default BreakpointsUtils;
