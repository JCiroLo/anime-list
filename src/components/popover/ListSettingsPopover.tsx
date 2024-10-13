import { FC } from "react";
import { Divider, Menu } from "@mui/material";

import { MenuOption, Text } from "@/components";
import { EditIcon, InfoCircleIcon, TrashIcon } from "@/icons";

import type { CSSProperties } from "react";
import type { PopoverOrigin } from "@mui/material";

type ListSettingsPopoverProps = {
  anchorEl: HTMLElement;
  open: boolean;
  origin: PopoverOrigin["horizontal"];
  onClose: () => void;
  onDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const ListSettingsPopover: FC<ListSettingsPopoverProps> = ({ anchorEl, open, origin, onClose, onDetails, onEdit, onDelete }) => {
  const arrowSx: Record<PopoverOrigin["horizontal"], CSSProperties> = {
    left: {
      left: 14,
      transform: "translateY(-50%) rotate(45deg)",
    },
    right: {
      right: 14,
      transform: "translateY(-50%) rotate(45deg)",
    },
    center: {
      left: "50%",
      transform: "translate(-50%, -50%) rotate(45deg)",
    },
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      transformOrigin={{ horizontal: origin, vertical: "top" }}
      anchorOrigin={{ horizontal: origin, vertical: "bottom" }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 1.5,
            borderRadius: 2,
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              zIndex: 0,
              top: 0,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              ...arrowSx[origin],
            },
          },
        },
      }}
      onClose={onClose}
    >
      <MenuOption icon={InfoCircleIcon} text="See details" onClick={onDetails} />
      <Divider sx={{ my: 1 }} />
      <MenuOption icon={EditIcon} text="Update list" onClick={onEdit} />
      <MenuOption
        icon={TrashIcon}
        text={
          <Text component="span" fontWeight="inherit" color="error">
            Delete list
          </Text>
        }
        props={{ icon: { color: "error" } }}
        onClick={onDelete}
      />
    </Menu>
  );
};

export default ListSettingsPopover;
