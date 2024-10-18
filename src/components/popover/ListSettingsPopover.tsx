import { FC } from "react";
import { Divider, Menu } from "@mui/material";

import { ListManagerDialog, MenuOption } from "@/components";
import { EditIcon, InfoCircleIcon, TrashIcon } from "@/icons";
import { useDialog, usePopover } from "@/hooks";

import type { CSSProperties } from "react";
import type { PopoverOrigin } from "@mui/material";
import type { TList } from "@/types/List";

type ListSettingsPopoverProps = {
  anchorEl: HTMLElement;
  list: TList;
  gutter?: number;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  arrow?: boolean;
};

const arrowPositions: Record<`${PopoverOrigin["horizontal"]}-${PopoverOrigin["vertical"]}`, CSSProperties> = {
  "left-top": {
    left: 14,
    transform: "translateY(-50%) rotate(45deg)",
  },
  "left-center": {
    left: 14,
    transform: "translateY(50%) rotate(45deg)",
  },
  "left-bottom": {
    left: 14,
    transform: "translateY(-50%) rotate(45deg)",
  },
  "right-top": {
    right: 14,
    transform: "translateY(-50%) rotate(45deg)",
  },
  "right-center": {
    right: 14,
    transform: "translateY(50%) rotate(45deg)",
  },
  "right-bottom": {
    right: 14,
    transform: "translateY(50%) rotate(45deg)",
  },
  "center-top": {
    top: 14,
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
  },
  "center-center": {
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
  },
  "center-bottom": {
    bottom: 14,
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
  },
};

const ListSettingsPopover: FC<ListSettingsPopoverProps> = ({
  anchorEl,
  list,
  gutter = 1.5,
  transformOrigin = { vertical: "top", horizontal: "left" },
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  arrow = true,
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
      transformOrigin={transformOrigin}
      anchorOrigin={anchorOrigin}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            margin: gutter,
            borderRadius: 2,
            ...(arrow
              ? {
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    zIndex: 0,
                    top: 0,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    ...arrowPositions[`${anchorOrigin.horizontal}-${anchorOrigin.vertical}`],
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
      <Divider sx={{ my: 1 }} />
      <MenuOption icon={EditIcon} text="Update list" onClick={handleUpdateList} />
      {
        <MenuOption
          icon={TrashIcon}
          text="Delete list"
          props={{ icon: { color: "error" }, text: { primaryTypographyProps: { color: "error", fontWeight: 500 } } }}
          onClick={handleDeleteList}
        />
      }
    </Menu>
  );
};

export default ListSettingsPopover;
