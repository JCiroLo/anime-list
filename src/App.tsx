import { Button } from "@nextui-org/button";

import { Container, Flex, Image } from "./components";
import { useLazyQuery } from "./hooks";
import { AnimeService } from "./services";

import { type TGetOptions } from "./services/AnimeService";
import { type TAnime } from "./types/Anime";

function App() {
  const [fetchAnimes, { data, error, isLoading }] = useLazyQuery<TAnime[], TGetOptions>(AnimeService.get, { trending: true });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Container>
      {data ? (
        <Flex gap={2}>
          {data.map((anime) => (
            <Image src={anime?.coverImage.large} alt="Poster image" width="100%" borderRadius={1} />
          ))}
        </Flex>
      ) : (
        <Button color="primary" onClick={fetchAnimes}>
          Load Animes
        </Button>
      )}
    </Container>
  );
}

export default App;
