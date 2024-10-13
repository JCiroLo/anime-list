import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { Image, Text } from "@/components";
import { Formatters, Route } from "@/utils";
import { ANIME } from "@/constants";

import type { TListAnime } from "@/types/List";

type TAnimeTableProps = {
  animes: TListAnime[];
};

const AnimeTable: FC<TAnimeTableProps> = ({ animes }) => {
  return (
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
          {animes.map(({ anime, watchedAt }, index) => (
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
  );
};

export default AnimeTable;
