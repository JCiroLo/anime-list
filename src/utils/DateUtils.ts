import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

import type { TAnimeDate, TAnimeSeason } from "@/types/Anime";

dayjs.extend(objectSupport);
dayjs.extend(relativeTime);
dayjs.extend(duration);

const DateUtils = {
  format(date?: TAnimeDate | Date | number, template = "MMM DD, YYYY") {
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
  relative(duration: number, unit?: duration.DurationUnitType) {
    return dayjs.duration(duration, unit).humanize(true);
  },
  season() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const values = {
      current: {
        value: "" as TAnimeSeason,
        year,
      },
      next: {
        value: "" as TAnimeSeason,
        year,
      },
    };

    if (month <= 3) {
      values.current.value = "WINTER";
      values.next.value = "SPRING";
    } else if (month <= 6) {
      values.current.value = "SPRING";
      values.next.value = "SUMMER";
    } else if (month <= 9) {
      values.current.value = "SUMMER";
      values.next.value = "FALL";
    } else {
      values.current.value = "FALL";
      values.next.value = "WINTER";
      values.next.year = year + 1;
    }

    return values;
  },
};

export default DateUtils;
