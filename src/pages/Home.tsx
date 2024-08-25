import { FC } from "react";
import { Container } from "@mui/material";

import { AnimeCard, Grid, Hero } from "@/components";
import { useQuery } from "@/hooks";
import { AnimeService } from "@/services";

import { type TGetOptions } from "@/services/AnimeService";
import { type TAnime } from "@/types/Anime";

const Home: FC = () => {
  const trendingAnimes = useQuery<TAnime[], TGetOptions>(AnimeService.get, { trending: true });
  // const trendingAnimes = useQuery<{ ok: boolean }, TFakeOptions>(AnimeService.fake);

  if (trendingAnimes.isLoading) {
    return <div>Loading...</div>;
  }

  if (trendingAnimes.error) {
    return <div>{trendingAnimes.error.message}</div>;
  }

  if (!trendingAnimes.data) {
    return <div>No data</div>;
  }

  return (
    <>
      <Hero slides={trendingAnimes.data} />
      <Container sx={{ position: "relative", zIndex: 10, mt: -4 }}>
        <Grid cols={6}>
          {trendingAnimes.data.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} props={{ card: { width: 8 * 36 } }} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
