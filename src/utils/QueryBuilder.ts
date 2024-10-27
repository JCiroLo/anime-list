import { Anime } from "@/models";
import AnimeQueries from "@/queries/AnimeQueries";

import type { TQueryDetailVariables, TQuerySearchVariables, TQuerySeasonVariables, TQuerySummaryVariables } from "@/queries/AnimeQueries";

const QueryBuilder = {
  anime: {
    summary: (variables: TQuerySummaryVariables) => ({
      query: AnimeQueries.summary,
      variables,
      transform: (data: any) => ({
        nextSeason: Anime.fromArray(data.nextSeason.media),
        popular: Anime.fromArray(data.popular.media),
        season: Anime.fromArray(data.season.media),
        top: Anime.fromArray(data.top.media),
        trending: Anime.fromArray(data.trending.media),
      }),
    }),
    season: (variables: TQuerySeasonVariables) => ({
      query: AnimeQueries.season,
      variables,
      transform: (data: any) => Anime.fromArray(data.Page.media),
    }),
    search: (variables: TQuerySearchVariables) => ({
      query: AnimeQueries.search,
      variables,
      transform: (data: any) => Anime.fromArray(data.Page.media),
    }),
    detail: (variables: TQueryDetailVariables) => ({
      query: AnimeQueries.detail,
      variables,
      transform: (data: any) => Anime.fromJSON(data.Media),
    }),
  },
};

export default QueryBuilder;
