import { FC } from "react";
import { Divider, Menu } from "@mui/material";

import { ListManagerDialog, MenuOption } from "@/components";
import { EditIcon, InfoCircleIcon, TrashIcon } from "@/icons";
import { useDialog, usePopover } from "@/hooks";
import { PopoverUtils } from "@/utils";

import type { TList } from "@/types/List";
import type { TArrowPosition, TPopoverOrigin } from "@/utils/PopoverUtils";

type ListSettingsPopoverProps = {
  anchorEl: HTMLElement;
  list: TList;
  gutter?: number;
  origin?: TPopoverOrigin;
  arrow?: TArrowPosition;
};

const ListSettingsPopover: FC<ListSettingsPopoverProps> = ({
  anchorEl,
  list,
  gutter = 1.5,
  origin = { transform: { vertical: "top", horizontal: "left" }, anchor: { vertical: "bottom", horizontal: "left" } },
  arrow,
}) => {
  const dialog = useDialog();
  const popover = usePopover();

  const handleClose = () => {
    popover.close();
  };

  const handleSeeListDetails = () => {
    dialog.open(<ListManagerDialog.Details list={list} />, { dialog: ListManagerDialog.defaultDialogProps() });
  };

  const handleUpdateList = () => {
    dialog.open(<ListManagerDialog.Edit list={list} />, { dialog: ListManagerDialog.defaultDialogProps() });
  };

  const handleDeleteList = () => {
    dialog.open(<ListManagerDialog.Delete list={list} />, { dialog: ListManagerDialog.defaultDialogProps() });
  };

  return (
    <Menu
      anchorEl={anchorEl}
      transformOrigin={origin.transform}
      anchorOrigin={origin.anchor}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            [PopoverUtils.getGutterPosition[arrow || "none"]]: gutter,
            borderRadius: 2,
            ...(arrow
              ? {
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    zIndex: 0,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    ...PopoverUtils.calculateArrowPosition[arrow],
                  },
                }
              : {}),
          },
        },
      }}
      open
      onClose={handleClose}
    >
      <MenuOption icon={InfoCircleIcon} text="See details" onClick={handleSeeListDetails} />
      {[
        <Divider key="divider" sx={{ my: 1 }} />,
        <MenuOption key="update" icon={EditIcon} text="Update list" onClick={handleUpdateList} />,
        <MenuOption
          key="delete"
          icon={TrashIcon}
          text="Delete list"
          slotProps={{ icon: { color: "error" }, text: { primaryTypographyProps: { color: "error", fontWeight: 500 } } }}
          onClick={handleDeleteList}
        />,
      ]
        .filter(() => list.isCustom)
        .map((item) => item)}
    </Menu>
  );
};

export default ListSettingsPopover;
