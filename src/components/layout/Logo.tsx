import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Stack } from "@mui/material";

import { Image } from "@/components";
import { useSettings } from "@/stores";
import { Route } from "@/utils";

import type { FC } from "react";

type TLogoProps = {
  height: number;
};

const Logo: FC<TLogoProps> = ({ height }) => {
  const { sidebar } = useSettings();

  return (
    <Stack justifyContent="center" alignItems="center" height={height}>
      <Link
        component={RouterLink}
        to={Route.to()}
        position="relative"
        fontSize="3em"
        fontFamily="moonet"
        textAlign="center"
        underline="none"
        color="primary.main"
      >
        <Box
          sx={{
            scale: sidebar.open ? 0 : 1,
            opacity: sidebar.open ? 0 : 1,
            visibility: sidebar.open ? "hidden" : "visible",
            transition: (t) => t.transitions.create(["scale", "opacity", "visibility"]),
          }}
        >
          HIKARIME
        </Box>
        <Stack
          className="link__logo-image"
          component="span"
          position="absolute"
          justifyContent="center"
          alignItems="center"
          sx={{
            inset: 0,
            scale: sidebar.open ? 0.75 : 0,
            opacity: sidebar.open ? 1 : 0,
            visibility: sidebar.open ? "visible" : "hidden",
            transition: (t) => t.transitions.create(["scale", "opacity", "visibility"]),
          }}
        >
          <Image src="/img/common/favicon.svg" alt="Hikarime logo" height={height / 8} />
        </Stack>
      </Link>
    </Stack>
  );
};

export default Logo;
