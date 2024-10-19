import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";

import { ListForm, Text } from "@/components";
import { useDialog } from "@/hooks";
import { Formatters, Route } from "@/utils";
import { useLists } from "@/stores";

import type { DialogProps } from "@mui/material";
import type { TList } from "@/types/List";
import type { TTextProps } from "@/components/ui/Text";

type TDetailsListDialogProps = {
  list: TList;
};
type TCreateListDialogProps = object;
type TEditListDialogProps = {
  list: TList;
};
type TDeleteListDialogProps = {
  list: TList;
};
type TListManagerDialog = FC & {
  Details: FC<TDetailsListDialogProps>;
  Create: FC<TCreateListDialogProps>;
  Edit: FC<TEditListDialogProps>;
  Delete: FC<TDeleteListDialogProps>;
  defaultDialogProps: () => Omit<DialogProps, "open" | "onClose">;
};

const ListManagerDialog: TListManagerDialog = () => {
  throw new Error("Not implemented");
};

const DetailsListDialog: FC<TDetailsListDialogProps> = ({ list }) => {
  const titleProps: TTextProps = { fontWeight: 500, width: 8 * 16 };
  const contentProps: TTextProps = { color: "text.secondary", width: "100%" };

  return (
    <>
      <DialogTitle>List details</DialogTitle>
      <DialogContent>
        <Stack display="grid" gridTemplateColumns="auto 1fr" spacing={1}>
          <Text {...titleProps}>Title</Text>
          <Text {...contentProps}>{list.name}</Text>

          <Text {...titleProps}>Description</Text>
          <Text {...contentProps}>{list.description}</Text>

          <Text {...titleProps}>Url</Text>
          <Text {...contentProps}>{Route.build(["list", list.slug])}</Text>

          <Text {...titleProps}>Saved animes</Text>
          <Text {...contentProps}>{list.animes.length}</Text>

          <Text {...titleProps}>Created at</Text>
          <Text {...contentProps}>{Formatters.anime.date(list.createdAt, "MMMM DD, YYYY")}</Text>

          <Text {...titleProps}>Last updated</Text>
          <Text {...contentProps}>{Formatters.anime.date(list.updatedAt, "MMMM DD, YYYY")}</Text>

          <Text {...titleProps}>Created by user</Text>
          <Text {...contentProps}>{list.isCustom ? "Yes" : "No"}</Text>
        </Stack>
      </DialogContent>
    </>
  );
};

const CreateListDialog: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dialog = useDialog();
  const lists = useLists((state) => state.lists);
  const { addList } = useLists();

  const handleDialogClose = () => {
    dialog.close();
  };

  const handleFormSubmit = (data: TList) => {
    if (lists[data.slug]) {
      enqueueSnackbar("List already exists, please choose a different slug", { variant: "error" });
      return;
    }

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
      <DialogTitle>Create list</DialogTitle>
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
      <DialogTitle>Edit list</DialogTitle>
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
      <DialogTitle>Delete list</DialogTitle>
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

ListManagerDialog.Details = DetailsListDialog;
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
