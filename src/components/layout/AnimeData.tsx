import { FC } from "react";
import { Stack, SxProps } from "@mui/material";

import { Text } from "@/components";
import { Formatters } from "@/utils";
import { ANIME } from "@/constants";

import type { TypographyProps } from "@mui/material";
import type { TAnime } from "@/types/Anime";

type TSubTextProps = {
  value: string | number | (string | undefined)[];
};
type TAnimeDataProps = {
  anime: TAnime;
  sx?: SxProps;
};

const SubText: FC<TSubTextProps> = ({ value }) => {
  const isArray = Array.isArray(value);
  const textProps: TypographyProps = { variant: "body2", color: "text.secondary" };

  return isArray ? (
    value.map((value, index) => (
      <Text key={index} {...textProps}>
        {value}
      </Text>
    ))
  ) : (
    <Text {...textProps}>{value}</Text>
  );
};

const AnimeData: FC<TAnimeDataProps> = ({ anime, sx }) => {
  const items = [
    {
      label: "Episodes",
      value: anime.episodes,
    },
    {
      label: "Episode duration",
      value: Formatters.time.duration(anime.duration),
    },
    {
      label: "Status",
      value: anime.status ? ANIME.values.status[anime.status] : null,
    },
    {
      label: "Start date",
      value: Formatters.time.date(anime.startDate),
    },
    {
      label: "End date",
      value: Formatters.time.date(anime.endDate),
    },
    {
      label: "Season",
      value: `${anime.season ? ANIME.values.season[anime.season] : "Not Available"} ${anime.seasonYear}`,
    },
    {
      label: "Studios",
      value: anime.studios?.map((studio) => studio.name),
    },
  ];

  return (
    <Stack component="ul" spacing={1} margin={0} sx={sx}>
      {items.map(
        ({ label, value }) =>
          value && (
            <Stack key={label} component="li">
              <Text variant="h4" fontSize="0.875em" fontWeight={500}>
                {label}
              </Text>
              <SubText value={value} />
            </Stack>
          )
      )}
    </Stack>
  );
};

export default AnimeData;
