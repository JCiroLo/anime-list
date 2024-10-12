import { Link as RouterLink, useParams } from "react-router-dom";
import { Button, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { AnimeBanner, ErrorMessage, Image, PageWrapper, Text } from "@/components";
import { CometIcon, GhostIcon } from "@/icons";
import { useLists } from "@/stores";
import { Formatters, Route } from "@/utils";
import { ANIME } from "@/constants";

const List = () => {
  const { slug } = useParams();

  const list = useLists((state) => state.lists[slug || ""]);

  const listExists = Boolean(list);
  const hasAnimes = listExists && list?.animes.length !== 0;

  return (
    <PageWrapper
      hero={hasAnimes ? <AnimeBanner anime={list!.animes.slice(-1)[0].anime} hideContent /> : null}
      content={
        !listExists ? (
          <ErrorMessage
            icon={<GhostIcon sx={{ fontSize: 48 }} />}
            title="Hey, it looks like your list doesn't exist."
            subtitle="We could not find the list you were looking for. Please create it first!"
          >
            <Button component={RouterLink} to={Route.to()}>
              Explore animes
            </Button>
          </ErrorMessage>
        ) : !hasAnimes ? (
          <ErrorMessage
            icon={<CometIcon sx={{ fontSize: 48 }} />}
            title="Hey, it looks like your list is empty."
            subtitle="Add your first anime!"
          >
            <Button component={RouterLink} to={Route.to()}>
              Explore animes
            </Button>
          </ErrorMessage>
        ) : (
          <Stack spacing={4}>
            <Stack>
              <Text variant="h1">{list!.name}</Text>
              {list!.description && <Text>{list!.description}</Text>}
            </Stack>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="anime list table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ padding: 1 }}>
                      Title
                    </TableCell>
                    <TableCell align="left" sx={{ padding: 1 }}>
                      Watched date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list!.animes.map(({ anime, watchedAt }, index) => (
                    <TableRow
                      key={anime.id}
                      hover
                      sx={{
                        "& td, & th": {
                          border: 0,
                        },
                        "&:hover .list-item__index": {
                          opacity: 1,
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          paddingY: 0,
                          paddingX: 1,
                          "&:first-of-type": {
                            padding: 0,
                          },
                        }}
                      >
                        <Stack position="relative" paddingY={0.5}>
                          <Image
                            src={anime.coverImage}
                            alt={anime.title.userPreferred}
                            width={7}
                            aspect={ANIME.coverImage.aspectRatio}
                            borderRadius={1}
                          />
                          <Text
                            className="list-item__index"
                            position="absolute"
                            fontSize="2em"
                            fontWeight={500}
                            sx={{
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: 0,
                              bgcolor: "background.paper",
                            }}
                          >
                            {index + 1}
                          </Text>
                        </Stack>
                        <Stack>
                          <Link component={RouterLink} to={Route.to("anime", anime.id)} variant="body1" fontWeight={500}>
                            {anime.title.userPreferred}
                          </Link>
                          {anime.title.english && (
                            <Text variant="body2" color="text.secondary">
                              {anime.title.english}
                            </Text>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell align="left" sx={{ paddingY: 0, paddingX: 1 }}>
                        <Text variant="body2" fontWeight={400} color="text.secondary">
                          {Formatters.anime.date(watchedAt)}
                        </Text>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )
      }
      separation={hasAnimes ? -12 : 0}
    />
  );
};

export default List;
