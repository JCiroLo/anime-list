import { Request } from "../utils";

const AnimeService = {
  async get<M>() {
    return await Request<M>("/anime", "GET");
  },
};

export default AnimeService;
