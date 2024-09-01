import { gql } from "@apollo/client";
import { Anime } from "@/models";

const AnimeQueries = {
  summary: {
    query: gql`
      query ($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextYear: Int) {
        trending: Page(page: 1, perPage: 12) {
          media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
            ...media
          }
        }
        season: Page(page: 1, perPage: 12) {
          media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
            ...media
          }
        }
        nextSeason: Page(page: 1, perPage: 12) {
          media(season: $nextSeason, seasonYear: $nextYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
            ...media
          }
        }
        popular: Page(page: 1, perPage: 12) {
          media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
            ...media
          }
        }
        top: Page(page: 1, perPage: 10) {
          media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
            ...media
          }
        }
      }
      fragment media on Media {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          extraLarge
          large
          color
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        bannerImage
        season
        seasonYear
        description
        type
        format
        status(version: 2)
        episodes
        duration
        chapters
        volumes
        genres
        isAdult
        averageScore
        popularity
        mediaListEntry {
          id
          status
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        studios(isMain: true) {
          edges {
            isMain
            node {
              id
              name
            }
          }
        }
      }
    `,
    variables: {
      type: "ANIME",
      season: "SUMMER",
      seasonYear: 2024,
      nextSeason: "FALL",
      nextYear: 2024,
    },
    transform: (data: any) => {
      return {
        nextSeason: Anime.fromArray(data.nextSeason.media),
        popular: Anime.fromArray(data.popular.media),
        season: Anime.fromArray(data.season.media),
        top: Anime.fromArray(data.top.media),
        trending: Anime.fromArray(data.trending.media),
      };
    },
  },
};

export default AnimeQueries;
