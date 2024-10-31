import { FC } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Button,
  Collapse,
  DialogActions,
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

import { AnimeListImageGrid, FadeTransition, ListManagerDialog, ListSettingsPopover } from "@/components";
import { ListSearchIcon, PlusIcon } from "@/icons";
import { useLists } from "@/stores";
import { useDialog, usePopover } from "@/hooks";
import { Route } from "@/utils";

import type { MouseEvent } from "react";
import type { TList } from "@/types/List";
import type { TDefaultDialogProps } from "@/utils/DialogUtils";

type TSidebarProps = {
  collapsed: boolean;
  isDialog?: boolean;
  onToggle: () => void;
};
type TSidebar = FC<TSidebarProps> & {
  defaultDialogProps: () => TDefaultDialogProps;
};

const Sidebar: TSidebar = ({ collapsed, isDialog, onToggle }) => {
  const { pathname } = useLocation();
  const dialog = useDialog();
  const popover = usePopover();
  const userLists = useLists((state) => state.lists);

  const isCollapsed = collapsed && !isDialog;

  const handleCreateList = () => {
    dialog.open(<ListManagerDialog.Create />, { dialog: ListManagerDialog.defaultDialogProps() });
  };

  const handleListRightClick = (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, list: TList) => {
    event.preventDefault();

    popover.open(
      <ListSettingsPopover
        anchorEl={event.currentTarget}
        list={list}
        gutter={3}
        origin={{ anchor: { vertical: "top", horizontal: "right" }, transform: { vertical: "top", horizontal: "left" } }}
        arrow="left-top"
      />
    );
  };

  const handleListClick = () => {
    onToggle();
  };

  return (
    <>
      <Stack
        component="aside"
        flexGrow={1}
        padding={1}
        borderRadius={isDialog ? 0 : 2}
        bgcolor={isDialog ? "transparent" : "background.paper"}
        sx={{ overflowX: "hidden", overflowY: "auto" }}
      >
        <Stack
          direction={isCollapsed ? "column" : "row"}
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          paddingRight={isDialog ? 4 : 0}
        >
          {isCollapsed ? (
            <Tooltip title="Show your lists" placement="right">
              <IconButton size="small" onClick={onToggle}>
                <ListSearchIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Fade in={!isCollapsed} style={{ transitionDelay: !isCollapsed ? "100ms" : "0ms" }}>
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
          {!isDialog && (
            <Tooltip title="Create new list" placement="right">
              <IconButton size="small" onClick={handleCreateList}>
                <PlusIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        <List>
          {Object.entries(userLists).map(([key, list]) =>
            !list ? null : (
              <ListItem key={key} disablePadding>
                <Tooltip title={isCollapsed ? list.name : null} placement="right">
                  <ListItemButton
                    component={RouterLink}
                    to={Route.to("list", list.slug)}
                    sx={{ bgcolor: pathname === Route.to("list", list.slug) ? "action.selected" : undefined, padding: 1, borderRadius: 3 }}
                    unstable_viewTransition
                    onContextMenu={(event) => handleListRightClick(event, list)}
                    onClick={handleListClick}
                  >
                    <ListItemIcon>
                      <AnimeListImageGrid animes={list.animes} width={40} height={40} />
                    </ListItemIcon>
                    <Collapse in={!isCollapsed} orientation="horizontal" unmountOnExit>
                      <ListItemText primary={list.name} secondary={`${list.animes.length} animes`} sx={{ margin: 0, textWrap: "nowrap" }} />
                    </Collapse>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            )
          )}
        </List>
      </Stack>
      {isDialog && (
        <DialogActions>
          <Button startIcon={<PlusIcon />} fullWidth onClick={handleCreateList}>
            Create new list
          </Button>
        </DialogActions>
      )}
    </>
  );
};

Sidebar.defaultDialogProps = () => ({
  fullScreen: true,
  TransitionComponent: FadeTransition.Right,
  PaperProps: {
    elevation: 0,
    sx: (t) => ({
      bgcolor: t.palette.background.paper,
      borderRadius: 0,
    }),
  },
});

export default Sidebar;
