import { FC } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Button,
  Collapse,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";

import { AnimeListImageGrid, ListManagerDialog, ListSettingsPopover } from "@/components";
import { ListSearchIcon, PlusIcon } from "@/icons";
import { useLists } from "@/stores";
import { useDialog, usePopover } from "@/hooks";
import { Route } from "@/utils";

import type { MouseEvent } from "react";
import type { TList } from "@/types/List";

type TSidebar = FC<{
  collapsed: boolean;
  onToggle: () => void;
}>;

const Sidebar: TSidebar = ({ collapsed, onToggle }) => {
  const { pathname } = useLocation();
  const dialog = useDialog();
  const popover = usePopover();
  const userLists = useLists((state) => state.lists);

  const handleCreateList = () => {
    dialog.open(<ListManagerDialog.Create />, { dialog: ListManagerDialog.defaultDialogProps() });
  };

  const handleListRightClick = (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, list: TList) => {
    event.preventDefault();

    popover.open(
      <ListSettingsPopover
        anchorEl={event.currentTarget}
        list={list}
        gutter={0}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      />
    );
  };

  return (
    <Stack
      component="aside"
      flexGrow={1}
      padding={1}
      borderRadius={2}
      bgcolor="background.paper"
      sx={{ overflowX: "hidden", overflowY: "auto" }}
    >
      <Stack direction={collapsed ? "column" : "row"} alignItems="center" justifyContent="space-between" spacing={1}>
        {collapsed ? (
          <Tooltip title="Show your lists" placement="right">
            <IconButton size="small" onClick={onToggle}>
              <ListSearchIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Fade in={!collapsed} style={{ transitionDelay: !collapsed ? "100ms" : "0ms" }}>
            <Button
              variant="text"
              startIcon={<ListSearchIcon />}
              fullWidth
              sx={{ justifyContent: "flex-start", textWrap: "nowrap" }}
              onClick={onToggle}
            >
              Your lists
            </Button>
          </Fade>
        )}
        <Tooltip title="Create new list" placement="right">
          <IconButton size="small" onClick={handleCreateList}>
            <PlusIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <List>
        {Object.entries(userLists).map(([key, list]) =>
          !list ? null : (
            <ListItem key={key} disablePadding>
              <Tooltip title={collapsed ? list.name : null} placement="right">
                <ListItemButton
                  component={RouterLink}
                  to={Route.to("list", list.slug)}
                  sx={{ bgcolor: pathname === Route.to("list", list.slug) ? "action.selected" : undefined, padding: 1, borderRadius: 3 }}
                  unstable_viewTransition
                  onContextMenu={(event) => handleListRightClick(event, list)}
                >
                  <ListItemIcon>
                    <AnimeListImageGrid animes={list.animes} width={40} height={40} />
                  </ListItemIcon>
                  <Collapse in={!collapsed} orientation="horizontal" unmountOnExit>
                    <ListItemText primary={list.name} secondary={`${list.animes.length} animes`} sx={{ margin: 0, textWrap: "nowrap" }} />
                  </Collapse>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          )
        )}
      </List>
    </Stack>
  );
};

export default Sidebar;
