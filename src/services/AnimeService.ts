import { Network } from "../utils";
import { Anime, AnimeImage } from "../models";

import { type TAnimeImage, type TAnime } from "../types/Anime";

export type TPickOptions = {
  id: string;
};
export type TGetOptions = {
  trending?: boolean;
};
export type TFakeOptions = {
  seconds: number;
  status: "success" | "error";
};
export type TImagesOptions = {
  id: string;
};

const network = {
  anime: new Network(Anime),
  image: new Network(AnimeImage),
};

const AnimeService = {
  async pick(options: TPickOptions) {
    return await network.anime.request<TAnime>(["/anime", options.id], "GET");
  },
  async get(options?: TGetOptions) {
    if (options?.trending) {
      return await network.anime.request<TAnime[]>("/top/anime", "GET");
    }

    return await network.anime.request<TAnime[]>("/anime", "GET");
  },
  async fake(options: TFakeOptions = { seconds: 3, status: "success" }) {
    return await network.anime.fakeRequest(options.seconds, options.status);
  },
  images: {
    async get(options: TImagesOptions) {
      if (options.id) {
        return await network.image.request<TAnimeImage>(["/anime", options.id, "pictures"], "GET");
      }

      return await network.image.request<TAnimeImage>(["/anime", "11212", "pictures"], "GET");
    },
  },
};

export default AnimeService;
