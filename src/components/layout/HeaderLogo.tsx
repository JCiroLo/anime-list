import { Link as RouterLink } from "react-router-dom";
import { Link, Stack } from "@mui/material";

import { Image, Text } from "@/components";
import { useSettings } from "@/stores";
import { Route } from "@/utils";

import type { FC } from "react";

type THeaderLogoProps = {
  height: number;
};

const HeaderLogo: FC<THeaderLogoProps> = ({ height }) => {
  const { sidebar } = useSettings();

  return (
    <Stack justifyContent="center" alignItems="center" height={height}>
      <Link component={RouterLink} to={Route.to()} position="relative" underline="none" color="primary.main">
        <Text
          fontSize="3em"
          fontFamily="moonet"
          textAlign="center"
          sx={{
            scale: sidebar.open ? 0 : 1,
            opacity: sidebar.open ? 0 : 1,
            visibility: sidebar.open ? "hidden" : "visible",
            transition: (t) => t.transitions.create(["scale", "opacity", "visibility"]),
          }}
        >
          HIKARIME
        </Text>
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

export default HeaderLogo;
