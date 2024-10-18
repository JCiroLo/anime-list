import { FC, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, ButtonBase, Grow, IconButton, Stack, TextField, Tooltip, useTheme } from "@mui/material";

import { Avatar, ProfilePopover } from "@/components";
import { CloseIcon, SearchIcon } from "@/icons";
import { useSession } from "@/stores";
import { usePopover } from "@/hooks";

import type { MouseEvent } from "react";

type THeader = FC<{
  isSidebarCollapsed: boolean;
}>;

const Header: THeader = ({ isSidebarCollapsed }) => {
  const theme = useTheme();
  const popover = usePopover();
  const [searchParams, setSearchParams] = useSearchParams();
  const avatar = useSession((state) => state.user.avatar);

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

  const handleProfileOpen = (event: MouseEvent<HTMLButtonElement>) => {
    popover.open(<ProfilePopover anchorEl={event.currentTarget} />);
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
      >
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
            <ButtonBase sx={{ borderRadius: 2 }} onClick={handleProfileOpen}>
              <Avatar size={32} src={avatar} />
            </ButtonBase>
          </Tooltip>
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
