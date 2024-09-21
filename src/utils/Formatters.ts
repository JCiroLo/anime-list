import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

import type { TAnimeDate, TAnimeSeason, TAnimeStatus } from "@/types/Anime";
import { ANIME } from "@/constants";

dayjs.extend(objectSupport);

const Formatters = {
  anime: {
    date(date?: TAnimeDate, template = "MMM DD, YYYY") {
      if (!date) {
        return null;
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
};

export default Formatters;
