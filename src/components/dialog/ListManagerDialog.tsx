import { FC } from "react";
import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { ListForm } from "@/components";
import { useDialog } from "@/hooks";

import type { DialogProps } from "@mui/material";
import type { TList } from "@/types/List";
import { useLists } from "@/stores";

type TDefaultDialogProps = Omit<DialogProps, "open" | "onClose">;
type TListManagerDialogProps = {
  action: "create" | "edit";
  list?: TList;
  onSave?: () => void;
};
type TListManagerDialog = FC<TListManagerDialogProps> & {
  defaultDialogProps: () => TDefaultDialogProps;
};

const ListManagerDialog: TListManagerDialog = ({ action, list }) => {
  const dialog = useDialog();
  const { addList } = useLists();

  const title = action === "create" ? "Create List" : "Edit List";

  const handleDialogClose = () => {
    dialog.close();
  };

  const handleFormSubmit = (data: TList) => {
    try {
      if (action === "create") {
        addList(data);
      }

      dialog.close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <ListForm id="list-form" list={list} onSubmit={handleFormSubmit} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleDialogClose}>
          Cancel
        </Button>
        <Button type="submit" form="list-form">
          Save
        </Button>
      </DialogActions>
    </>
  );
};

ListManagerDialog.defaultDialogProps = () => ({
  maxWidth: "sm",
  fullWidth: true,
  PaperProps: {
    sx: (t) => ({
      bgcolor: t.palette.background.dialog,
      borderRadius: 2,
    }),
  },
});

export default ListManagerDialog;
