import { Network } from "../utils";
import { Anime } from "../models";

import { type TAnime } from "../types/Anime";

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
  async fake(options: TFakeOptions = { seconds: 3, status: "success" }) {
    return await network.fakeRequest(options.seconds, options.status);
  },
};

export default AnimeService;
