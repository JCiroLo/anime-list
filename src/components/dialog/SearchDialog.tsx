import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, CircularProgress, Dialog, Stack } from "@mui/material";

import { AnimeCard, ErrorMessage, Grid, PageWrapper, Text } from "@/components";
import { MoodSadIcon } from "@/icons";
import { useDebouncedEffect, useInfiniteQuery } from "@/hooks";
import { LAYOUT } from "@/constants";
import { QueryBuilder } from "@/utils";

import type { TAnime } from "@/types/Anime";

const QUERIES = {
  search: QueryBuilder.anime.search({
    page: 1,
    type: "ANIME",
    sort: "SEARCH_MATCH",
    search: "",
    perPage: 36,
  }),
};

const SearchDialog = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const [animes, setAnimes] = useState([] as TAnime[]);
  const [isLoading, setIsLoading] = useState(false);

  const [scrollObserver, { hasNextPage, error, refetch }] = useInfiniteQuery(QUERIES.search.query, {
    variables: { ...QUERIES.search.variables, search },
    debug: true,
    onRefetch: (data) => setAnimes((prev) => [...prev, ...QUERIES.search.transform(data)]),
  });

  useDebouncedEffect(async () => {
    console.log("Mounting");
    setAnimes([]);
    
    if (search) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      setIsLoading(true);

      await refetch({ resetPagination: true });

      setIsLoading(false);
    }
  }, [search]);

  return (
    <Dialog
      open={Boolean(search)}
      PaperProps={{ elevation: 0 }}
      sx={{ zIndex: "search" }}
      keepMounted={false}
      fullScreen
      disableEnforceFocus
      disableAutoFocus
    >
      <PageWrapper
        content={
          <Stack spacing={error || animes.length === 0 ? 2 : 4}>
            <Text variant="h3" fontSize="2em" fontWeight={700}>
              Results for "{search}"
            </Text>

            {error && (
              <ErrorMessage
                icon={<MoodSadIcon sx={{ fontSize: 48 }} />}
                title="Oops, something went wrong."
                subtitle="An error occurred while fetching results. Please try again later or contact us if the problem persists."
              >
                <Button component="a" href="mailto:contact-hikarime@gmail.com">
                  Contact us
                </Button>
              </ErrorMessage>
            )}

            {!isLoading && (
              <>
                {animes.length > 0 ? (
                  <Grid cols={LAYOUT.grid.columns}>
                    {animes.map((anime, index) => (
                      <AnimeCard
                        key={anime.id + index}
                        anime={anime}
                        origin="popular-this-season"
                        props={{ flyout: { zIndex: 20 + index } }}
                      />
                    ))}
                  </Grid>
                ) : (
                  <ErrorMessage
                    title="Sorry, we have not found any matches (╥﹏╥)"
                    subtitle="Please try another search or contact us if the problem persists."
                  >
                    <Button component="a" href="mailto:contact-hikarime@gmail.com">
                      Contact us
                    </Button>
                  </ErrorMessage>
                )}
                <h1>hey</h1>
                {hasNextPage && <CircularProgress ref={scrollObserver.ref} sx={{ alignSelf: "center" }} />}
              </>
            )}
          </Stack>
        }
        headerGutter
      />
    </Dialog>
  );
};

export default SearchDialog;
