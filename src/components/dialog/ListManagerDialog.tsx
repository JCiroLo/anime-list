import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { ListForm, Text } from "@/components";
import { useDialog } from "@/hooks";
import { useLists } from "@/stores";

import type { DialogProps } from "@mui/material";
import type { TList } from "@/types/List";

type TCreateListDialogProps = object;
type TEditListDialogProps = {
  list: TList;
};
type TDeleteListDialogProps = {
  list: TList;
};
type TListManagerDialog = FC & {
  Create: FC<TCreateListDialogProps>;
  Edit: FC<TEditListDialogProps>;
  Delete: FC<TDeleteListDialogProps>;
  defaultDialogProps: () => Omit<DialogProps, "open" | "onClose">;
};

const ListManagerDialog: TListManagerDialog = () => {
  throw new Error("Not implemented");
};

const CreateListDialog: FC<TCreateListDialogProps> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dialog = useDialog();
  const { addList } = useLists();

  const handleDialogClose = () => {
    dialog.close();
  };

  const handleFormSubmit = (data: TList) => {
    try {
      addList(data);
      enqueueSnackbar("List has been created successfully", { variant: "success" });

      dialog.close();
    } catch (error) {
      enqueueSnackbar("List creation failed, please try again", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <>
      <DialogTitle>Create List</DialogTitle>
      <DialogContent>
        <ListForm id="list-form" onSubmit={handleFormSubmit} />
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

const EditListDialog: FC<TEditListDialogProps> = ({ list }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dialog = useDialog();
  const { updateList } = useLists();

  const handleDialogClose = () => {
    dialog.close();
  };

  const handleFormSubmit = (data: TList) => {
    try {
      updateList(data, list);
      enqueueSnackbar("List has been updated successfully", { variant: "success" });

      dialog.close();
    } catch (error) {
      enqueueSnackbar("List update failed, please try again", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <>
      <DialogTitle>Edit List</DialogTitle>
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

const DeleteListDialog: FC<TDeleteListDialogProps> = ({ list }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dialog = useDialog();
  const { removeList } = useLists();

  const handleDialogClose = () => {
    dialog.close();
  };

  const handleDeleteList = () => {
    try {
      removeList(list.slug);
      navigate("/", { replace: true });
      enqueueSnackbar("List has been deleted successfully", { variant: "success" });

      dialog.close();
    } catch (error) {
      enqueueSnackbar("List deletion failed, please try again", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <>
      <DialogTitle>Delete List</DialogTitle>
      <DialogContent>
        <Text>Are you sure you want to delete this list? This action cannot be undone and all data will be lost.</Text>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleDialogClose}>
          Cancel
        </Button>
        <Button onClick={handleDeleteList}>Delete</Button>
      </DialogActions>
    </>
  );
};

ListManagerDialog.Create = CreateListDialog;
ListManagerDialog.Edit = EditListDialog;
ListManagerDialog.Delete = DeleteListDialog;
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
