import { FC, useState } from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { Box, Link, Stack, useTheme } from "@mui/material";

import { BreakpointsDebug, Header, SearchDialog, Sidebar } from "@/components";
import { DialogProvider, PopoverProvider } from "@/providers";
import { Env, Route } from "@/utils";
import { useBreakpoints } from "@/hooks";

const AppWrapper: FC = () => {
  const theme = useTheme();
  const { isTabletOrBelow } = useBreakpoints();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const panel = {
    height: `calc(100vh - 16px)`,
    borderRadius: 2,
    background: "background.paper",
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    // Providers must be called here in the AppWrapper because they need to be inside the Router context
    <>
      <DialogProvider>
        <PopoverProvider>
          <Stack direction="row" spacing={1} paddingLeft={1}>
            {!isTabletOrBelow && (
              <Stack
                flexShrink={0}
                flexGrow={0}
                width={isSidebarCollapsed ? theme.sizes.sidebar.collapsedRealWidth : theme.sizes.sidebar.realWidth}
                height={`calc(100vh - 8px)`}
                sx={{
                  transition: theme.transitions.create("width"),
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
                <Sidebar collapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
              </Stack>
            )}
            <Stack
              position="relative"
              flexGrow={1}
              height={panel.height}
              paddingRight={1}
              marginTop={1}
              overflow="auto"
              borderRadius={panel.borderRadius}
              sx={{
                transition: theme.transitions.create("width"),
              }}
            >
              <Header isSidebarCollapsed={isSidebarCollapsed} />
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
