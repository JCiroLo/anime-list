import type { TAnimeSeason, TAnimeStatus } from "@/types/Anime";

export const LAYOUT = {
  hero: {
    disabledTrailerAnimationTag: "no-trailer-animation",
  },
  grid: {
    columns: {
      six: {
        xs: 3,
        sm: 4,
        md: 5,
        lg: 6,
        xl: 6,
        xxl: 6,
      },
      five: {
        xs: 3,
        sm: 4,
        md: 5,
        lg: 5,
        xl: 5,
        xxl: 5,
      },
    },
  },
};

export const SOCIAL = {
  github: "https://github.com/JCiroLo",
  discord: "https://discord.gg/hikarime",
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
