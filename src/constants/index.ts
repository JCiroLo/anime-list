import { type Breakpoint } from "@mui/material";

export const LAYOUT = {
  hero: {
    disabledTrailerAnimationTag: "no-trailer-animation",
  },
  grid: {
    columns: {
      xs: 3,
      sm: 4,
      md: 5,
      lg: 6,
      xl: 6,
      exclude(...breakpoints: Breakpoint[]) {
        const { xs, sm, md, lg, xl } = this;

        return breakpoints.reduce(
          (values: Partial<Record<Breakpoint, number>>, breakpoint) => {
            const { [breakpoint]: _, ...rest } = values;
            return rest;
          },
          { xs, sm, md, lg, xl }
        );
      },
    } as Partial<Record<Breakpoint, number>> & { exclude(...breakpoints: Breakpoint[]): Partial<Record<Breakpoint, number>> },
  },
};
