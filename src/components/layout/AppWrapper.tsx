import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { Stack, useTheme } from "@mui/material";

import { Header, SearchDialog, Sidebar } from "@/components";
import { DialogProvider } from "@/providers";

type TAppWrapper = FC;

const AppWrapper: TAppWrapper = () => {
  const theme = useTheme();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const panel = {
    height: `calc(100vh - ${theme.sizes.header.activeRealHeight}px - 8px)`,
    borderRadius: 2,
    background: "background.paper",
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <DialogProvider>
      <Header />
      <Stack direction="row" spacing={1} paddingLeft={1} marginTop={theme.sizes.header.activeHeight}>
        <Stack
          flexShrink={0}
          flexGrow={0}
          width={isSidebarCollapsed ? theme.sizes.sidebar.collapsedRealWidth : theme.sizes.sidebar.realWidth}
          height={panel.height}
          overflow="auto"
          borderRadius={panel.borderRadius}
          bgcolor="background.paper"
          sx={{
            transition: theme.transitions.create("width"),
          }}
        >
          <Sidebar collapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
        </Stack>
        <Stack
          flexGrow={1}
          height={`calc(100vh - 8px - ${theme.sizes.header.activeRealHeight}px)`}
          paddingRight={1}
          overflow="auto"
          borderRadius={panel.borderRadius}
          sx={{
            "::-webkit-scrollbar": {
              width: 8,
              height: 8,
            },
            "::-webkit-scrollbar-thumb": {
              borderRadius: 16,
              background: "#777",

              "&:hover": {
                background: "#aaa",
              },
            },
            "::-webkit-scrollbar-track": {
              background: "transparent",
            },
            transition: theme.transitions.create("width"),
          }}
        >
          <Outlet />
        </Stack>
      </Stack>
      <SearchDialog />
    </DialogProvider>
  );
};

export default AppWrapper;
