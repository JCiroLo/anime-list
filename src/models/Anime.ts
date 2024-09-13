/* eslint-disable @typescript-eslint/no-explicit-any */

import { ANIME } from "@/constants";
import type {
  TAnimeDate,
  TAnimeFormat,
  TAnimeImage,
  TAnimeSeason,
  TAnimeStatus,
  TAnimeStudio,
  TAnimeTitle,
  TAnimeTrailer,
  TAnimeType,
  TAnime,
} from "../types/Anime";

class Anime implements TAnime {
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

  constructor(data: TAnime) {
    this.id = data.id;
    this.title = data.title;
    this.bannerImage = data.bannerImage;
    this.coverImage = data.coverImage;
    this.trailer = data.trailer;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.season = data.season;
    this.seasonYear = data.seasonYear;
    this.description = data.description;
    this.type = data.type;
    this.format = data.format;
    this.status = data.status;
    this.episodes = data.episodes;
    this.duration = data.duration;
    this.chapters = data.chapters;
    this.volumes = data.volumes;
    this.genres = data.genres;
    this.isAdult = data.isAdult;
    this.averageScore = data.averageScore;
    this.popularity = data.popularity;
    this.studios = data.studios;
  }

  static fromJSON(anime: any): TAnime {
    return new Anime({
      id: anime.id,
      title: {
        romaji: anime.title?.romaji,
        english: anime.title?.english,
        native: anime.title?.native,
        userPreferred: anime.title?.userPreferred || ANIME.title.notFound,
      },
      bannerImage: anime.bannerImage,
      trailer: {
        id: anime.trailer?.id,
        site: anime.trailer?.site,
        thumbnail: anime.trailer?.thumbnail,
      },
      coverImage: {
        extraLarge: anime.coverImage?.extraLarge,
        large: anime.coverImage?.large || ANIME.coverImage.notFound,
        medium: anime.coverImage?.medium,
        color: anime.coverImage?.color || ANIME.coverImage.defaultColor,
      },
      startDate: {
        day: anime.startDate?.day,
        month: anime.startDate?.month,
        year: anime.startDate?.year,
      },
      endDate: {
        day: anime.endDate?.day,
        month: anime.endDate?.month,
        year: anime.endDate?.year,
      },
      season: anime.season,
      seasonYear: anime.seasonYear,
      description: anime.description,
      type: anime.type,
      format: anime.format,
      status: anime.status,
      episodes: anime.episodes,
      duration: anime.duration,
      chapters: anime.chapters,
      volumes: anime.volumes,
      genres: anime.genres,
      isAdult: anime.isAdult,
      averageScore: anime.averageScore,
      popularity: anime.popularity,
      studios:
        anime.studios?.edges?.map(({ node }: any) => {
          return {
            id: node?.id,
            name: node?.name,
            type: node?.type,
          };
        }) || [],
    });
  }

  static fromArray(animes: any[]): TAnime[] {
    return animes.map((anime) => this.fromJSON(anime));
  }
}

export default Anime;
