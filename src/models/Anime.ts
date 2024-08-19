/* eslint-disable @typescript-eslint/no-explicit-any */

import { type TAnimeImage, type TShowType, type TAnime } from "../types/Anime";

class Anime implements TAnime {
  id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  synopsis: string;
  description: string;
  titles: {
    en: string;
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

  constructor(data: TAnime) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.slug = data.slug;
    this.synopsis = data.synopsis;
    this.description = data.description;
    this.titles = data.titles;
    this.canonicalTitle = data.canonicalTitle;
    this.abbreviatedTitles = data.abbreviatedTitles;
    this.averageRating = data.averageRating;
    this.ratingFrequencies = data.ratingFrequencies;
    this.userCount = data.userCount;
    this.favoritesCount = data.favoritesCount;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.nextRelease = data.nextRelease;
    this.popularityRank = data.popularityRank;
    this.ratingRank = data.ratingRank;
    this.ageRating = data.ageRating;
    this.ageRatingGuide = data.ageRatingGuide;
    this.subtype = data.subtype;
    this.status = data.status;
    this.tba = data.tba;
    this.posterImage = data.posterImage;
    this.coverImage = data.coverImage;
    this.episodeCount = data.episodeCount;
    this.episodeLength = data.episodeLength;
    this.totalLength = data.totalLength;
    this.youtubeVideoId = data.youtubeVideoId;
    this.showType = data.showType;
    this.nsfw = data.nsfw;
    this.coverImageTopOffset = data.coverImageTopOffset;
  }

  static fromNetwork(animes: any): TAnime {
    return new Anime({ id: animes.id, ...animes.attributes });
  }

  static fromNetworkArray(animes: any[]): TAnime[] {
    return animes.map((anime) => new Anime({ id: anime.id, ...anime.attributes }));
  }
}

export default Anime;
