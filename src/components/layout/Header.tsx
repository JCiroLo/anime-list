import { FC, useRef, useState } from "react";
import {
  alpha,
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material";

import { Overlay } from "@/components";
import { SearchIcon } from "@/icons";

type THeader = FC;

const Header: THeader = () => {
  const theme = useTheme();
  const isScrolling = useScrollTrigger({
    disableHysteresis: true,
    threshold: theme.sizes.hero.realHeight - theme.sizes.header.realHeight * 2,
  });
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState({
    open: false,
    value: "",
  });

  const handleSearchToggle = () => {
    if (searchFieldRef.current) {
      searchFieldRef.current.focus();
    }
    setSearch((prev) => ({ ...prev, open: true }));
  };

  return (
    <Stack
      component="header"
      position="fixed"
      top={0}
      zIndex="appBar"
      spacing={2}
      flexDirection="row"
      alignItems="center"
      width="100%"
      height={isScrolling ? theme.sizes.header.activeRealHeight : theme.sizes.header.realHeight}
      px={3}
      py={1}
      sx={{
        transition: theme.transitions.create(["height"]),
      }}
    >
      <Box
        position="absolute"
        zIndex={-1}
        bgcolor={alpha(theme.palette.background.default, 0.25)}
        sx={{
          inset: 0,
          opacity: isScrolling ? 1 : 0,
          backdropFilter: "blur(16px) saturate(2)",
          transition: theme.transitions.create(["opacity"]),
        }}
      />
      <Overlay.Gradient zIndex={-1} color={alpha(theme.palette.background.default, 0.9)} />
      <Stack flexDirection="row" alignItems="center">
        {/* <Image src="/img/common/logo-transparent.png" alt="Logo" height={theme.sizes.header.height - 2} /> */}
        <Typography variant="h1" color="primary.main">
          Hikarime
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} flexGrow={1} alignItems="center" justifyContent="flex-end">
        <Stack position="relative">
          <TextField
            inputRef={searchFieldRef}
            size="small"
            placeholder="Cowboy Bebop"
            sx={{
              position: "absolute",
              right: 0,
              opacity: search.open ? 1 : 0,
              pointerEvents: search.open ? "auto" : "none",
              transition: theme.transitions.create(["opacity", "width"]),
              "& .MuiInputBase-root": {
                borderRadius: 32,
                "& input": {
                  width: search.open ? "32ch" : 12,
                  transition: theme.transitions.create(["width"]),
                },
              },
            }}
            onBlur={() => setSearch((prev) => ({ ...prev, open: false }))}
          />
          <Tooltip title="Search">
            <IconButton onClick={handleSearchToggle}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Tooltip title="Profile">
          <ButtonBase sx={{ borderRadius: 2 }}>
            <Avatar sx={{ borderRadius: 2, width: 32, height: 32 }} />
          </ButtonBase>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Header;
