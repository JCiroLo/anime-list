import { FC } from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { Box, IconButton, Link, Stack, useTheme } from "@mui/material";

import { BreakpointsDebug, Header, SearchDialog, Sidebar } from "@/components";
import { DialogProvider, PopoverProvider } from "@/providers";
import { Env, Route } from "@/utils";
import { useBreakpoints } from "@/hooks";
import { useSettings } from "@/stores";
import { CloseIcon } from "@/icons";

const AppWrapper: FC = () => {
  const theme = useTheme();
  const { isTabletOrBelow } = useBreakpoints();
  const isSidebarCollapsed = useSettings((state) => state.sidebar.open);
  const { toggleSidebarOpen } = useSettings();

  const handleSidebarToggle = () => {
    toggleSidebarOpen();
  };

  const panel = {
    height: `calc(100vh - 16px)`,
    borderRadius: 2,
    background: "background.paper",
  };

  return (
    // Providers must be called here in the AppWrapper because they need to be inside the Router context
    <>
      <DialogProvider>
        <PopoverProvider>
          <Stack direction="row" spacing={1} paddingLeft={1}>
            <Stack
              position={isTabletOrBelow ? "fixed" : "relative"}
              zIndex={isTabletOrBelow ? "modal" : undefined}
              top={0}
              left={isTabletOrBelow ? (isSidebarCollapsed ? 0 : "-100%") : 0}
              flexShrink={0}
              flexGrow={0}
              width={
                isTabletOrBelow ? "100vw" : isSidebarCollapsed ? theme.sizes.sidebar.collapsedRealWidth : theme.sizes.sidebar.realWidth
              }
              height={isTabletOrBelow ? "100vh" : `calc(100vh - 8px)`}
              bgcolor={isTabletOrBelow ? "background.paper" : "transparent"}
              sx={{
                backdropFilter: isTabletOrBelow ? "blur(8px)" : "none",
                transition: theme.transitions.create(["width", "left"]),
              }}
            >
              <Stack justifyContent="center" alignItems="center" height={theme.sizes.header.realHeight + 16}>
                <Link
                  component={RouterLink}
                  to={Route.to()}
                  fontSize="2em"
                  fontFamily="redwood"
                  textAlign="center"
                  underline="hover"
                  color="primary.main"
                >
                  Hikarime
                </Link>
              </Stack>
              <Sidebar isDialog={isTabletOrBelow} />
              {isTabletOrBelow && (
                <Box position="absolute" zIndex={1} sx={{ top: 8, right: 8 }}>
                  <IconButton size="small" onClick={handleSidebarToggle}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Stack>
            <Stack
              position="relative"
              flexGrow={1}
              height={panel.height}
              paddingRight={1}
              marginTop={1}
              overflow="auto"
              borderRadius={panel.borderRadius}
              sx={{
                transition: theme.transitions.create(["width"]),
              }}
            >
              <Header />
              <Outlet />
            </Stack>
          </Stack>
          <SearchDialog />
        </PopoverProvider>
      </DialogProvider>

      {Env.ENV === "development" && Env.DEBUGGER && (
        <Box position="absolute" zIndex={10000} left={8} bottom={8}>
          <BreakpointsDebug />
        </Box>
      )}
    </>
  );
};

export default AppWrapper;
