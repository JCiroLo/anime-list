import { TAnime } from "./Anime";

export type TList = {
  name: string;
  slug: TListSlug;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
  isCustom?: boolean;
  animes: TListAnime[];
};

export type TListAnime = {
  anime: TAnime;
  watchedAt: number;
};

export type TListSlug = "favorites" | "watchlist" | "watched-list" | (string & {});
