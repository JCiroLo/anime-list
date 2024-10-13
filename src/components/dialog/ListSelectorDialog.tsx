import { FC } from "react";
import { DialogContent, DialogTitle, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";

import { AnimeListImageGrid, ErrorMessage } from "@/components";
import { MoodConfuzedIcon } from "@/icons";
import { useDialog } from "@/hooks";
import { useLists } from "@/stores";

import type { DialogProps } from "@mui/material";
import type { TList } from "@/types/List";

type TDefaultDialogProps = Omit<DialogProps, "open" | "onClose">;
type TListSelectorProps = {
  onSelect: (list: TList) => void;
};
type TListSelector = FC<TListSelectorProps> & {
  defaultDialogProps: () => TDefaultDialogProps;
};

const ListSelector: TListSelector = ({ onSelect }) => {
  const dialog = useDialog();
  const lists = useLists((state) => state.lists);

  const userLists = Object.entries(lists);

  const handleSelectList = (list: TList) => {
    onSelect(list);
    dialog.close();
  };

  return (
    <>
      <DialogTitle>All your anime lists</DialogTitle>
      <DialogContent sx={{ padding: 1 }}>
        <Stack>
          {userLists.length ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {userLists.map(([key, list]) =>
                !list ? null : (
                  <ListItem key={key} disablePadding>
                    <ListItemButton onClick={() => handleSelectList(list)}>
                      <ListItemIcon>
                        <AnimeListImageGrid animes={list.animes} width={40} height={40} />
                      </ListItemIcon>
                      <ListItemText primary={list.name} secondary={`${list.animes.length} animes`} sx={{ margin: 0, textWrap: "nowrap" }} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
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
      borderRadius: 2,
    }),
  },
});

export default ListSelector;
