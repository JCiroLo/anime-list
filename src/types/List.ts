import { TAnime } from "./Anime";

export type TList = {
  name: string;
  slug: TListSlug;
  description?: string;
  isCustom?: boolean;
  animes: TListAnime[];
};

export type TListAnime = {
  anime: TAnime;
  watchedAt: number;
};

export type TListSlug = "my-favorites" | "my-watchlist" | "my-watched-list" | (string & {});
