import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
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

import { AnimeListImageGrid, ManageListDialog } from "@/components";
import { ListSearchIcon, PlusIcon } from "@/icons";
import { useLists } from "@/stores";
import { useDialog } from "@/hooks";
import { Route } from "@/utils";

type TSidebar = FC<{
  collapsed: boolean;
  onToggle: () => void;
}>;

const Sidebar: TSidebar = ({ collapsed, onToggle }) => {
  const dialog = useDialog();
  const userLists = useLists((state) => state.lists);

  const handleCreateList = () => {
    dialog.open(<ManageListDialog action="create" />, { dialog: ManageListDialog.defaultDialogProps() });
  };

  return (
    <Stack component="aside" padding={1} sx={{ overflowX: "hidden" }}>
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
                <ListItemButton component={RouterLink} to={Route.to("list", list.slug)} unstable_viewTransition>
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
