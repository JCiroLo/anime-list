import { FC } from "react";
import { Stack, SxProps } from "@mui/material";

import { Text } from "@/components";
import { Formatters } from "@/utils";

import type { TypographyProps } from "@mui/material";
import type { TAnime } from "@/types/Anime";

type TValueText = FC<{
  value: string | number | (string | undefined)[];
}>;
type TAnimeData = FC<{
  anime: TAnime;
  sx?: SxProps;
}>;

const SubText: TValueText = ({ value }) => {
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

const AnimeData: TAnimeData = ({ anime, sx }) => {
  const items = [
    {
      label: "Episodes",
      value: anime.episodes,
    },
    {
      label: "Episode duration",
      value: Formatters.anime.duration(anime.duration),
    },
    {
      label: "Status",
      value: Formatters.anime.status(anime.status),
    },
    {
      label: "Start date",
      value: Formatters.anime.date(anime.startDate),
    },
    {
      label: "End date",
      value: Formatters.anime.date(anime.endDate),
    },
    {
      label: "Season",
      value: `${Formatters.anime.season(anime.season)} ${anime.seasonYear}`,
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
