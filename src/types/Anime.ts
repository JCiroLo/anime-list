export type TAnime = {
  id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  synopsis: string;
  description: string;
  titles: {
    en?: string;
    en_us?: string;
    en_jp: string;
    ja_jp: string;
  };
  canonicalTitle: string;
  abbreviatedTitles: string[];
  averageRating: string;
  ratingFrequencies: {
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
    "9": string;
    "10": string;
    "11": string;
    "12": string;
    "13": string;
    "14": string;
    "15": string;
    "16": string;
    "17": string;
    "18": string;
    "19": string;
    "20": string;
  };
  userCount: number;
  favoritesCount: number;
  startDate: string;
  endDate?: string;
  nextRelease: string;
  popularityRank: number;
  ratingRank: number;
  ageRating: "G" | "PG" | "R" | "R18";
  ageRatingGuide: string;
  subtype: TShowType;
  status: "current" | "finished" | "tba" | "unreleased" | "upcoming";
  tba?: string;
  posterImage: {
    tiny: string;
    large: string;
    small: string;
    medium: string;
    original: string;
    meta: {
      dimensions: {
        tiny: TAnimeImage;
        large: TAnimeImage;
        small: TAnimeImage;
        medium: TAnimeImage;
      };
    };
  };
  coverImage: {
    tiny: string;
    large: string;
    small: string;
    original: string;
    meta: {
      dimensions: {
        tiny: TAnimeImage;
        large: TAnimeImage;
        small: TAnimeImage;
      };
    };
  };
  episodeCount?: number;
  episodeLength: number;
  totalLength: number;
  youtubeVideoId: string;
  showType: TShowType;
  nsfw: boolean;
  /**
   * @deprecated The property should not be used
   */
  coverImageTopOffset: number;
  getTitle: () => string;
};

export type TAnimeImage = {
  width: number;
  height: number;
};

export type TShowType = "ONA" | "OVA" | "TV" | "movie" | "music" | "special";
