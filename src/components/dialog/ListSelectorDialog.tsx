import { FC } from "react";
import { DialogContent, DialogTitle, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";

import { AnimeListImageGrid, ErrorMessage, Text } from "@/components";
import { CheckIcon, MoodConfuzedIcon } from "@/icons";
import { useDialog } from "@/hooks";
import { useLists } from "@/stores";

import type { TAnime } from "@/types/Anime";
import type { TList, TListSlug } from "@/types/List";
import type { TDefaultDialogProps } from "@/utils/DialogUtils";

type TListSelectorProps = {
  anime?: TAnime;
  onSelect: (slug: TListSlug) => void;
};
type TListSelector = FC<TListSelectorProps> & {
  defaultDialogProps: () => TDefaultDialogProps;
};

const ListSelector: TListSelector = ({ anime, onSelect }) => {
  const dialog = useDialog();
  const lists = useLists((state) => state.lists);
  const { isAnimeInList } = useLists();

  const userLists = Object.entries(lists);

  const handleSelectList = (list: TList) => {
    onSelect(list.slug);
    dialog.close();
  };

  return (
    <>
      <DialogTitle>All your anime lists</DialogTitle>
      <DialogContent sx={{ padding: 1 }}>
        <Stack>
          {userLists.length ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {userLists.map(([key, list]) => {
                if (!list) return;

                const isAnimeInTheList = anime && isAnimeInList(list.slug, anime);

                return (
                  <ListItem key={key} disablePadding>
                    <ListItemButton
                      sx={{
                        bgcolor: isAnimeInTheList ? "action.selected" : undefined,
                        padding: 1,
                        borderRadius: 3,
                      }}
                      onClick={() => handleSelectList(list)}
                    >
                      <ListItemIcon>
                        <AnimeListImageGrid animes={list.animes} width={40} height={40} />
                      </ListItemIcon>
                      <ListItemText primary={list.name} secondary={`${list.animes.length} animes`} sx={{ margin: 0, textWrap: "nowrap" }} />
                      {isAnimeInTheList && (
                        <Text lineHeight={0}>
                          <CheckIcon color="success" fontSize="small" />
                        </Text>
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </Stack>
          ) : (
            <ErrorMessage
              icon={<MoodConfuzedIcon sx={{ fontSize: 48 }} />}
              title="Hey, it looks like you have no lists."
              subtitle="Try creating one!"
              slotProps={{
                title: {
                  fontSize: "1.5rem",
                  marginBottom: 1,
                },
              }}
              centered
            />
          )}
        </Stack>
      </DialogContent>
    </>
  );
};

ListSelector.defaultDialogProps = () => ({
  maxWidth: "xs",
  fullWidth: true,
  PaperProps: {
    sx: (t) => ({
      bgcolor: t.palette.background.dialog,
      borderRadius: 4,
    }),
  },
});

export default ListSelector;
