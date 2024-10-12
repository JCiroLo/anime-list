import { FC, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, ButtonBase, Grow, IconButton, Stack, TextField, Tooltip, useTheme } from "@mui/material";

import { Avatar, ProfilePopover } from "@/components";
import { CloseIcon, SearchIcon } from "@/icons";
import { useSession } from "@/stores";

type THeader = FC<{
  isSidebarCollapsed: boolean;
}>;

const Header: THeader = ({ isSidebarCollapsed }) => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const avatar = useSession((state) => state.user.avatar);

  const profileButtonRef = useRef<HTMLButtonElement>(null!);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const querySearch = searchParams.get("search");

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

  const handleProfileOpen = () => {
    setIsProfileMenuOpen(true);
  };

  const handleProfileClose = () => {
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      <Stack
        component="header"
        position="fixed"
        zIndex="appBar"
        top={8}
        right={16}
        spacing={2}
        flexDirection="row"
        alignItems="center"
        width={`calc(100vw - 32px - ${isSidebarCollapsed ? theme.sizes.sidebar.collapsedRealWidth : theme.sizes.sidebar.realWidth}px)`}
        height={theme.sizes.header.realHeight}
        px={1}
        py={1}
        sx={{
          transition: theme.transitions.create(["width", "height"]),
        }}
      >
        {/* <Box
        position="absolute"
        zIndex={-1}
        bgcolor={alpha(theme.palette.background.default, 0.25)}
        sx={{
          inset: 0,
          backdropFilter: "blur(16px) saturate(2)",
        }}
      /> */}
        {/* <Overlay.Gradient zIndex={-1} color={alpha(theme.palette.background.default, 0.9)} /> */}
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
            <ButtonBase ref={profileButtonRef} sx={{ borderRadius: 2 }} onClick={handleProfileOpen}>
              <Avatar size={32} src={avatar} />
            </ButtonBase>
          </Tooltip>
        </Stack>
      </Stack>
      <ProfilePopover anchorEl={profileButtonRef.current} open={isProfileMenuOpen} onClose={handleProfileClose} />
    </>
  );
};

export default Header;
