import { MouseEvent } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";

import { AnimeBanner, AnimeTable, ErrorMessage, ListManagerDialog, ListSettingsPopover, PageWrapper, Text } from "@/components";
import { CometIcon, GhostIcon, SettingsIcon } from "@/icons";
import { useDialog, usePopover } from "@/hooks";
import { useLists } from "@/stores";
import { Route } from "@/utils";

import type { PopoverOrigin } from "@mui/material";
import type { TList } from "@/types/List";

const List = () => {
  const popover = usePopover();
  const dialog = useDialog();
  const { slug } = useParams();
  const list = useLists((state) => state.lists[slug || ""]);

  const listExists = Boolean(list);
  const hasAnimes = listExists && list?.animes.length !== 0;

  const handleSettingsOpen = (event: MouseEvent<HTMLButtonElement>, list: TList, origin: PopoverOrigin["horizontal"]) => {
    popover.open(<ListSettingsPopover anchorEl={event.currentTarget} list={list} />);
  };

  const handleCreateList = () => {
    dialog.open(<ListManagerDialog.Create />, { dialog: ListManagerDialog.defaultDialogProps() });
  };

  return (
    <PageWrapper
      hero={hasAnimes ? <AnimeBanner anime={list!.animes.slice(-1)[0].anime} hideContent /> : null}
      content={
        !listExists ? (
          <ErrorMessage
            icon={<GhostIcon sx={{ fontSize: 48 }} />}
            title="It looks like your list doesn't exist."
            subtitle="We could not find the list you were looking for. Please create it first!"
          >
            <Stack direction="row" spacing={1}>
              <Button onClick={handleCreateList}>Create list</Button>
              <Button component={RouterLink} to={Route.to()} variant="outlined">
                Explore animes
              </Button>
            </Stack>
          </ErrorMessage>
        ) : !hasAnimes ? (
          <>
            <ErrorMessage
              icon={<CometIcon sx={{ fontSize: 48 }} />}
              title="Hey, it looks like your list is empty."
              subtitle="Add your first anime!"
            >
              <Stack direction="row" spacing={1}>
                <Button component={RouterLink} to={Route.to()}>
                  Explore animes
                </Button>
                <Button variant="outlined" onClick={(event) => handleSettingsOpen(event, list!, "center")}>
                  List settings
                </Button>
              </Stack>
            </ErrorMessage>
          </>
        ) : (
          <Stack spacing={4}>
            <Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Text variant="h1">{list!.name}</Text>
                <Tooltip title="List settings">
                  <IconButton onClick={(event) => handleSettingsOpen(event, list!, "right")}>
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              {list!.description && <Text>{list!.description}</Text>}
            </Stack>
            <AnimeTable animes={list!.animes} />
          </Stack>
        )
      }
      separation={hasAnimes ? -12 : 0}
      headerGutter={!hasAnimes}
    />
  );
};

export default List;
