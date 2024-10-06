import { FC, useRef, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { alpha, Avatar, Box, ButtonBase, Grow, IconButton, Link, Stack, TextField, Tooltip, Typography, useTheme } from "@mui/material";

import { Overlay } from "@/components";
import { CloseIcon, SearchIcon } from "@/icons";
import { Route } from "@/utils";

type THeader = FC;

const Header: THeader = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch = searchParams.get("search");

  const [isSearching, setIsSearching] = useState(false);
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const handleSearchToggle = () => {
    if (searchFieldRef.current) {
      searchFieldRef.current.focus();
    }
    setIsSearching(true);
  };

  const handleSearchClear = () => {
    setSearchParams({ search: "" });
    setIsSearching(false);
  };

  const handleSearchBlur = () => {
    if (!querySearch) {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchParams({ search: query });
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
      height={theme.sizes.header.activeRealHeight}
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
          backdropFilter: "blur(16px) saturate(2)",
        }}
      />
      <Overlay.Gradient zIndex={-1} color={alpha(theme.palette.background.default, 0.9)} />
      <Stack flexDirection="row" alignItems="center">
        {/* <Image src="/img/common/logo-transparent.png" alt="Logo" height={theme.sizes.header.height - 2} /> */}
        <Link component={RouterLink} to={Route.to()} underline="none">
          <Typography fontSize="2em" color="primary.main" fontFamily="redwood">
            Hikarime
          </Typography>
        </Link>
      </Stack>
      <Stack direction="row" spacing={1} flexGrow={1} alignItems="center" justifyContent="flex-end">
        <Stack position="relative">
          <TextField
            inputRef={searchFieldRef}
            value={querySearch || ""}
            variant="filled"
            size="small"
            placeholder="Cowboy Bebop"
            sx={{
              position: "absolute",
              right: 0,
              opacity: isSearching ? 1 : 0,
              pointerEvents: isSearching ? "auto" : "none",
              transition: theme.transitions.create(["opacity"]),
              "& .MuiInputBase-root": {
                "& input": {
                  width: isSearching ? "32ch" : 12,
                  transition: theme.transitions.create(["width"]),
                },
              },
            }}
            hiddenLabel
            onChange={handleSearchChange}
            onBlur={handleSearchBlur}
          />
          <Stack position="relative" width={40} height={40}>
            <Grow in={isSearching}>
              <Box position="absolute">
                <Tooltip title="Clear">
                  <IconButton onClick={handleSearchClear}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grow>
            <Grow in={!isSearching}>
              <Box position="absolute">
                <Tooltip title="Search">
                  <IconButton onClick={handleSearchToggle}>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grow>
          </Stack>
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
