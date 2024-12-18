import { FC } from "react";

import { Avatar, Grid, Image } from "@/components";
import { PhotoIcon } from "@/icons";

import type { TListAnime } from "@/types/List";

type TAnimeListImageGridProps = {
  animes: TListAnime[];
  width: number;
  height: number;
};

const AnimeListImageGrid: FC<TAnimeListImageGridProps> = ({ animes, width, height }) => {
  const listAnimes = animes.map(({ anime }) => anime);
  const sortedAnimes = listAnimes.slice(-4).reverse();

  return sortedAnimes.length === 0 ? (
    <Grid cols={1} width={width} height={height} justifyItems="center" alignItems="center">
      <Avatar size={width}>
        <PhotoIcon fontSize="medium" />
      </Avatar>
    </Grid>
  ) : sortedAnimes.length === 1 ? (
    <Grid cols={1} width={width} height={height} overflow="hidden" borderRadius={2}>
      <Image src={sortedAnimes[0].coverImage} alt={sortedAnimes[0].title.userPreferred} width="100%" aspect={1} />
    </Grid>
  ) : sortedAnimes.length === 2 ? (
    <Grid cols={2} gap={0} width={width} height={height} overflow="hidden" borderRadius={2}>
      {sortedAnimes.map((anime) => (
        <Image key={anime.id} src={anime.coverImage} alt={anime.title.userPreferred} width="100%" aspect={1 / 2} />
      ))}
    </Grid>
  ) : sortedAnimes.length === 3 ? (
    <Grid cols={2} gap={0} width={width} height={height} overflow="hidden" borderRadius={2}>
      {sortedAnimes.map((anime) => (
        <Image key={anime.id} src={anime.coverImage} alt={anime.title.userPreferred} width="100%" aspect={1} />
      ))}
      <Image key={sortedAnimes[0].id} src={sortedAnimes[0].coverImage} alt={sortedAnimes[0].title.userPreferred} width="100%" aspect={1} />
    </Grid>
  ) : (
    <Grid cols={2} gap={0} width={width} height={height} overflow="hidden" borderRadius={2}>
      {sortedAnimes.map((anime) => (
        <Image key={anime.id} src={anime.coverImage} alt={anime.title.userPreferred} width="100%" aspect={1} />
      ))}
    </Grid>
  );
};

export default AnimeListImageGrid;
