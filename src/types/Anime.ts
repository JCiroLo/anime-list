export type TAnime = {
  id: string;
  title: TAnimeTitle;
  bannerImage?: string;
  coverImage: TAnimeImage;
  trailer: TAnimeTrailer;
  startDate?: TAnimeDate;
  endDate?: TAnimeDate;
  season?: TAnimeSeason;
  seasonYear?: number;
  description?: string;
  type?: TAnimeType;
  format?: TAnimeFormat;
  status?: TAnimeStatus;
  episodes?: number;
  duration?: number;
  chapters?: number;
  volumes?: number;
  genres?: string[];
  isAdult?: boolean;
  averageScore?: number;
  popularity?: number;
  studios?: TAnimeStudio[];
};

export type TAnimeTitle = {
  romaji?: string;
  english?: string;
  native?: string;
  userPreferred: string;
};

export type TAnimeImage = {
  extraLarge?: string;
  large: string;
  medium?: string;
  color: string;
};

export type TAnimeDate = {
  year?: number;
  month?: number;
  day?: number;
};

export type TAnimeStudio = {
  id?: number;
  name?: string;
  isAnimationStudio?: boolean;
};

export type TAnimeTrailer = {
  id: string;
  site: string;
  thumbnail: string;
};

export type TAnimeSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;

export type TAnimeType = "ANIME" | "MANGA" | null;

export type TAnimeFormat = "TV" | "TV_SHORT" | "MOVIE" | "SPECIAL" | "OVA" | "ONA" | "MUSIC" | "MANGA" | "NOVEL" | "ONE_SHOT" | null;

export type TAnimeStatus = "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS" | null;
