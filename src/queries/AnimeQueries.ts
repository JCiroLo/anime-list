/* eslint-disable @typescript-eslint/no-explicit-any */

import { gql } from "@apollo/client";
import { Anime } from "@/models";

import type { TAnimeSeason, TAnimeType } from "@/types/Anime";

export type TQuerySummaryVariables = {
  type: TAnimeType;
  season: TAnimeSeason;
  nextSeason: TAnimeSeason;
  seasonYear: number;
  nextYear: number;
};

export type TQuerySearchVariables = {
  page: number;
  type: TAnimeType;
  sort: "SEARCH_MATCH";
  search: string;
};

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
          medium
          color
        }
        trailer {
          id
          site
          thumbnail
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
  search: {
    query: gql`
      query (
        $page: Int = 1
        $id: Int
        $type: MediaType
        $isAdult: Boolean = false
        $search: String
        $format: [MediaFormat]
        $status: MediaStatus
        $countryOfOrigin: CountryCode
        $source: MediaSource
        $season: MediaSeason
        $seasonYear: Int
        $year: String
        $onList: Boolean
        $yearLesser: FuzzyDateInt
        $yearGreater: FuzzyDateInt
        $episodeLesser: Int
        $episodeGreater: Int
        $durationLesser: Int
        $durationGreater: Int
        $chapterLesser: Int
        $chapterGreater: Int
        $volumeLesser: Int
        $volumeGreater: Int
        $licensedBy: [Int]
        $isLicensed: Boolean
        $genres: [String]
        $excludedGenres: [String]
        $tags: [String]
        $excludedTags: [String]
        $minimumTagRank: Int
        $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
      ) {
        Page(page: $page, perPage: 18) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          media(
            id: $id
            type: $type
            season: $season
            format_in: $format
            status: $status
            countryOfOrigin: $countryOfOrigin
            source: $source
            search: $search
            onList: $onList
            seasonYear: $seasonYear
            startDate_like: $year
            startDate_lesser: $yearLesser
            startDate_greater: $yearGreater
            episodes_lesser: $episodeLesser
            episodes_greater: $episodeGreater
            duration_lesser: $durationLesser
            duration_greater: $durationGreater
            chapters_lesser: $chapterLesser
            chapters_greater: $chapterGreater
            volumes_lesser: $volumeLesser
            volumes_greater: $volumeGreater
            licensedById_in: $licensedBy
            isLicensed: $isLicensed
            genre_in: $genres
            genre_not_in: $excludedGenres
            tag_in: $tags
            tag_not_in: $excludedTags
            minimumTagRank: $minimumTagRank
            sort: $sort
            isAdult: $isAdult
          ) {
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
              medium
              color
            }
            trailer {
              id
              site
              thumbnail
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
          }
        }
      }
    `,
    transform: (data: any) => {
      return Anime.fromArray(data.Page.media);
    },
  },
};

export default AnimeQueries;
