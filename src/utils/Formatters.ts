import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

import { ANIME } from "@/constants";

import type { TAnimeDate, TAnimeSeason, TAnimeStatus } from "@/types/Anime";

dayjs.extend(objectSupport);

const Formatters = {
  anime: {
    date(date?: TAnimeDate | Date | number, template = "MMM DD, YYYY") {
      if (!date) {
        return null;
      }

      if (typeof date === "number") {
        return dayjs(date).format(template);
      }

      if (date instanceof Date) {
        return dayjs(date).format(template);
      }

      return dayjs({ year: date.year, month: date.month, day: date.day }).format(template);
    },
    duration(duration?: number) {
      if (!duration) {
        return null;
      }

      return `${duration} mins`;
    },
    status(status?: TAnimeStatus) {
      if (!status) {
        return null;
      }

      return ANIME.values.status[status];
    },
    season(season?: TAnimeSeason) {
      if (!season) {
        return "Not Available";
      }

      return ANIME.values.season[season];
    },
  },
  string: {
    slugify(string: string) {
      return string.replace(/\s+/g, "-").toLowerCase();
    },
  },
};

export default Formatters;
