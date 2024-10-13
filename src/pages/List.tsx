import { MouseEvent, useRef, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";

import { AnimeBanner, AnimeTable, ErrorMessage, ListManagerDialog, ListSettingsPopover, PageWrapper, Text } from "@/components";
import { CometIcon, EllipsisHorizontal, GhostIcon, SettingsIcon } from "@/icons";
import { useDialog } from "@/hooks";
import { useLists } from "@/stores";
import { Route } from "@/utils";

import type { TList } from "@/types/List";

const List = () => {
  const dialog = useDialog();
  const { slug } = useParams();
  const list = useLists((state) => state.lists[slug || ""]);

  const settingsButtonRef = useRef<HTMLButtonElement>(null!);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const listExists = Boolean(list);
  const hasAnimes = listExists && list?.animes.length !== 0;

  const handleShareList = (list: TList) => {
    dialog.open(<ListManagerDialog.Create />, { dialog: ListManagerDialog.defaultDialogProps() });
  };

  const handleCreateList = () => {
    dialog.open(<ListManagerDialog.Create />, { dialog: ListManagerDialog.defaultDialogProps() });
  };

  const handleUpdateList = (list: TList) => {
    dialog.open(<ListManagerDialog.Edit list={list} />, { dialog: ListManagerDialog.defaultDialogProps() });
  };

  const handleDeleteList = (list: TList) => {
    dialog.open(<ListManagerDialog.Delete list={list} />, { dialog: ListManagerDialog.defaultDialogProps() });
  };

  const handleSettingsOpen = (event: MouseEvent<HTMLButtonElement>) => {
    settingsButtonRef.current = event.currentTarget;

    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
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
                <Button variant="outlined" onClick={handleSettingsOpen}>
                  List settings
                </Button>
              </Stack>
            </ErrorMessage>
            <ListSettingsPopover
              anchorEl={settingsButtonRef.current}
              open={isSettingsOpen}
              origin="center"
              onClose={handleSettingsClose}
              onShare={() => handleShareList(list!)}
              onEdit={() => handleUpdateList(list!)}
              onDelete={() => handleDeleteList(list!)}
            />
          </>
        ) : (
          <Stack spacing={4}>
            <Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Text variant="h1">{list!.name}</Text>
                <Tooltip title="List settings">
                  <IconButton onClick={handleSettingsOpen}>
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              {list!.description && <Text>{list!.description}</Text>}
            </Stack>
            <AnimeTable animes={list!.animes} />
            <ListSettingsPopover
              anchorEl={settingsButtonRef.current}
              open={isSettingsOpen}
              origin="right"
              onClose={handleSettingsClose}
              onShare={() => handleShareList(list!)}
              onEdit={() => handleUpdateList(list!)}
              onDelete={() => handleDeleteList(list!)}
            />
          </Stack>
        )
      }
      separation={hasAnimes ? -12 : 0}
      headerGutter={!hasAnimes}
    />
  );
};

export default List;
