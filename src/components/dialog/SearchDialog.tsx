import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Dialog, Stack } from "@mui/material";
import { useLazyQuery } from "@apollo/client";

import { AnimeCard, Grid, PageWrapper, Text } from "@/components";
import { useDebouncedEffect } from "@/hooks";
import { AnimeQueries } from "@/queries";
import { LAYOUT } from "@/constants";

import type { TAnime } from "@/types/Anime";
import type { TQuerySearchVariables } from "@/queries/AnimeQueries";

const SearchDialog = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const [animes, setAnimes] = useState([] as TAnime[]);

  const [onSearch, { error }] = useLazyQuery(AnimeQueries.search.query, {
    onCompleted: (data) => setAnimes(AnimeQueries.search.transform(data)),
  });

  useDebouncedEffect(() => {
    if (search) {
      onSearch({
        variables: {
          page: 1,
          type: "ANIME",
          sort: "SEARCH_MATCH",
          search,
        } as TQuerySearchVariables,
      });
    }
  }, [search]);

  return (
    <Dialog open={Boolean(search)} PaperProps={{ elevation: 0 }} sx={{ zIndex: "search" }} fullScreen disableEnforceFocus disableAutoFocus>
      <PageWrapper topGutter={4}>
        <Stack spacing={error || animes.length === 0 ? 2 : 4}>
          <Text variant="h3" fontSize="2em" fontWeight={700}>
            Results for "{search}"
          </Text>

          {error && <Text>Oops, something went wrong. Please try again later.</Text>}

          {animes.length > 0 ? (
            <Grid cols={LAYOUT.grid.columns}>
              {animes.map((anime, index) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  origin="popular-this-season"
                  props={{ flyout: { zIndex: 20 + index } }}
                />
              ))}
            </Grid>
          ) : (
            <Stack spacing={2}>
              <Text color="text.secondary">Sorry, we have not found any matches (╥﹏╥)</Text>
            </Stack>
          )}
        </Stack>
      </PageWrapper>
    </Dialog>
  );
};

export default SearchDialog;
