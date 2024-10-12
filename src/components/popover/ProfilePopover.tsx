import { FC } from "react";
import { Divider, IconButton, Menu, MenuItem, Stack, Tooltip } from "@mui/material";

import { Avatar, AvatarManagerDialog, Text } from "@/components";
import { useLists, useSession } from "@/stores";
import { useDialog } from "@/hooks";

type ProfilePopoverProps = {
  anchorEl: HTMLElement;
  open: boolean;
  onClose: () => void;
};

const ProfilePopover: FC<ProfilePopoverProps> = ({ anchorEl, open, onClose }) => {
  const dialog = useDialog();
  const lists = useLists((state) => state.lists);
  const user = useSession((state) => state.user);

  const listsCount = Object.keys(lists).length;

  const handleUpdateAvatar = () => {
    dialog.open(<AvatarManagerDialog />, { dialog: AvatarManagerDialog.defaultDialogProps() });
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      onClose={onClose}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" paddingX={2} paddingY={0.5}>
        <Tooltip title="Update avatar" placement="left">
          <IconButton sx={{ p: 0 }} onClick={handleUpdateAvatar}>
            <Avatar size={48} src={user.avatar} sx={{ marginLeft: -0.5 }} />
          </IconButton>
        </Tooltip>
        <Stack>
          <Text variant="body1" fontWeight={500}>
            {user.nickname}
          </Text>
          <Text variant="caption" lineHeight={1} color="text.secondary">
            {listsCount} lists
          </Text>
        </Stack>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <MenuItem>Light Mode</MenuItem>
      <MenuItem>Export lists</MenuItem>
    </Menu>
  );
};

export default ProfilePopover;
