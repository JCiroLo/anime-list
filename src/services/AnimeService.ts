import { Network } from "../utils";
import { Anime } from "../models";

import { type TAnime } from "../types/Anime";

export type TPickOptions = {
  id: string;
};
export type TGetOptions = {
  trending?: boolean;
};

const network = new Network(Anime);

const AnimeService = {
  async pick(options: TPickOptions) {
    return await network.request<TAnime>(["/anime", options.id], "GET");
  },
  async get(options?: TGetOptions) {
    if (options?.trending) {
      return await network.request<TAnime[]>("/trending/anime", "GET");
    }

    return await network.request<TAnime[]>("/anime", "GET");
  },
};

export default AnimeService;
