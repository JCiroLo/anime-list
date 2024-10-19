import { FC } from "react";
import { Divider, Menu } from "@mui/material";

import { ListManagerDialog, MenuOption } from "@/components";
import { EditIcon, InfoCircleIcon, TrashIcon } from "@/icons";
import { useDialog, usePopover } from "@/hooks";

import type { CSSProperties } from "react";
import type { TList } from "@/types/List";
import type { TArrowPosition, TPopoverOrigin } from "@/components/ui/Popover";

type ListSettingsPopoverProps = {
  anchorEl: HTMLElement;
  list: TList;
  gutter?: number;
  origin?: TPopoverOrigin;
  arrow?: TArrowPosition;
};

const arrowPositions: Record<TArrowPosition, CSSProperties> = {
  "left-top": {
    left: 0,
    top: 15,
    transform: "translateX(-50%) rotate(45deg)",
  },
  "left-center": {
    left: 0,
    bottom: "50%",
    transform: "translate(-50%, 50%) rotate(45deg)",
  },
  "left-bottom": {
    left: 0,
    bottom: 15,
    transform: "translateX(-50%) rotate(45deg)",
  },
  "right-top": {
    right: 0,
    top: 15,
    transform: "translateX(50%) rotate(45deg)",
  },
  "right-center": {
    right: 0,
    bottom: "50%",
    transform: "translate(50%, 50%) rotate(45deg)",
  },
  "right-bottom": {
    right: 0,
    bottom: 15,
    transform: "translateX(50%) rotate(45deg)",
  },
  "top-left": {
    top: 0,
    left: 15,
    transform: "translateY(-50%) rotate(45deg)",
  },
  "top-center": {
    top: 0,
    left: "50%",
    transform: "translate(-50%, -50%) rotate(45deg)",
  },
  "top-right": {
    top: 0,
    right: 15,
    transform: "translateY(-50%) rotate(45deg)",
  },
  "bottom-left": {
    bottom: 0,
    left: 15,
    transform: "translateY(50%) rotate(45deg)",
  },
  "bottom-center": {
    bottom: 0,
    left: "50%",
    transform: "translate(-50%, 50%) rotate(45deg)",
  },
  "bottom-right": {
    bottom: 0,
    right: 15,
    transform: "translateY(50%) rotate(45deg)",
  },
};
const gutterPosition: Record<TArrowPosition | "none", "marginLeft" | "marginRight" | "marginTop" | "marginBottom" | "margin"> = {
  "left-top": "marginLeft",
  "left-center": "marginLeft",
  "left-bottom": "marginLeft",
  "right-top": "marginRight",
  "right-center": "marginRight",
  "right-bottom": "marginRight",
  "top-left": "marginTop",
  "top-center": "marginTop",
  "top-right": "marginTop",
  "bottom-left": "marginBottom",
  "bottom-center": "marginBottom",
  "bottom-right": "marginBottom",
  none: "margin",
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
            [gutterPosition[arrow || "none"]]: gutter,
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
                    ...arrowPositions[arrow],
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
        <Divider sx={{ my: 1 }} />,
        <MenuOption icon={EditIcon} text="Update list" onClick={handleUpdateList} />,
        <MenuOption
          icon={TrashIcon}
          text="Delete list"
          props={{ icon: { color: "error" }, text: { primaryTypographyProps: { color: "error", fontWeight: 500 } } }}
          onClick={handleDeleteList}
        />,
      ]
        .filter(() => list.isCustom)
        .map((item) => item)}
    </Menu>
  );
};

export default ListSettingsPopover;
