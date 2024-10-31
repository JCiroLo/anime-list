import type { Breakpoint } from "@mui/material";
import type { TAnimeSeason, TAnimeStatus } from "@/types/Anime";

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

export const ANIME = {
  title: {
    notFound: "Title not found",
  },
  coverImage: {
    notFound: "/img/common/cover-404.jpg",
    defaultColor: "#646470",
    aspectRatio: 115 / 163,
  },
  bannerImage: {
    aspectRatio: 903 / 320,
  },
  popover: {
    flyoutWidth: 8 * 36,
  },
  values: {
    status: {
      CANCELLED: "Cancelled",
      FINISHED: "Finished",
      HIATUS: "Hiatus",
      NOT_YET_RELEASED: "Not yet released",
      RELEASING: "Releasing",
    } as Record<Exclude<TAnimeStatus, null>, string>,
    season: {
      FALL: "Fall",
      SPRING: "Spring",
      SUMMER: "Summer",
      WINTER: "Winter",
    } as Record<Exclude<TAnimeSeason, null>, string>,
  },
};
