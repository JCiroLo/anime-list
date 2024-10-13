import { FC } from "react";
import { Divider, IconButton, Menu, Stack, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";

import { Avatar, AvatarManagerDialog, MenuOption, Text } from "@/components";
import { useLists, useSession } from "@/stores";
import { useDialog } from "@/hooks";
import { ExportIcon, SunIcon } from "@/icons";

type ProfilePopoverProps = {
  anchorEl: HTMLElement;
  open: boolean;
  onClose: () => void;
};

const ProfilePopover: FC<ProfilePopoverProps> = ({ anchorEl, open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dialog = useDialog();
  const lists = useLists((state) => state.lists);
  const user = useSession((state) => state.user);
  const { updateNickname } = useSession();

  const listsCount = Object.keys(lists).length;

  const handleUpdateAvatar = () => {
    dialog.open(<AvatarManagerDialog />, { dialog: AvatarManagerDialog.defaultDialogProps() });
  };

  const handleUpdateNickname = (value: string) => {
    if (value.trim().length === 0) {
      enqueueSnackbar("Nickname cannot be empty", { variant: "error" });
      return;
    }

    if (value === user?.nickname) {
      return;
    }

    updateNickname(value);
    enqueueSnackbar("Nickname updated!", { variant: "success" });
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
            borderRadius: 3,
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
      MenuListProps={{
        sx: { width: 200 },
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
          <Text.Editable variant="body1" fontWeight={500} maxLength={12} value={user.nickname} onChange={handleUpdateNickname} />
          <Text variant="caption" lineHeight={1} color="text.secondary">
            {listsCount} lists
          </Text>
        </Stack>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <MenuOption
        icon={SunIcon}
        text="Light mode"
        props={{
          button: { disabled: true },
          text: { secondary: "Coming soon", secondaryTypographyProps: { variant: "caption", lineHeight: 1 } },
        }}
        onClick={() => {}}
      />
      <MenuOption
        icon={ExportIcon}
        text="Export data"
        props={{
          button: { disabled: true },
          text: { secondary: "Coming soon", secondaryTypographyProps: { variant: "caption", lineHeight: 1 } },
        }}
        onClick={() => {}}
      />
      <Divider sx={{ my: 1 }} />
      <Text variant="body2" fontSize="0.75rem" textAlign="center" sx={{ opacity: 0.25 }}>
        {import.meta.env.PACKAGE_VERSION}
      </Text>
    </Menu>
  );
};

export default ProfilePopover;
