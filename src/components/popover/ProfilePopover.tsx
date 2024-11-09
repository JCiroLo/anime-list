import { FC } from "react";
import { Divider, IconButton, Menu, Stack, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";

import { Avatar, AvatarManagerDialog, MenuOption, Text } from "@/components";
import { useLists, useSession } from "@/stores";
import { useDialog, usePopover } from "@/hooks";
import { DiscordIcon, ExportIcon, GithubIcon, SunIcon } from "@/icons";
import { SOCIAL } from "@/constants";

type ProfilePopoverProps = {
  anchorEl: HTMLElement;
};

const ProfilePopover: FC<ProfilePopoverProps> = ({ anchorEl }) => {
  const { enqueueSnackbar } = useSnackbar();
  const popover = usePopover();
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
      enqueueSnackbar("Nickname cannot be empty", { severity: "error" });
      return;
    }

    if (value === user?.nickname) {
      return;
    }

    updateNickname(value);
    enqueueSnackbar("Nickname updated!", { severity: "success" });
  };

  const handleClose = () => {
    popover.close();
  };

  return (
    <Menu
      anchorEl={anchorEl}
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
      open
      onClose={handleClose}
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
        slotProps={{
          button: { disabled: true },
          text: { secondary: "Coming soon", secondaryTypographyProps: { variant: "caption", lineHeight: 1 } },
        }}
        onClick={() => {}}
      />
      <MenuOption
        icon={ExportIcon}
        text="Export data"
        slotProps={{
          button: { disabled: true },
          text: { secondary: "Coming soon", secondaryTypographyProps: { variant: "caption", lineHeight: 1 } },
        }}
        onClick={() => {}}
      />
      <Divider sx={{ my: 1 }} />
      <Stack direction="row" justifyContent="center" spacing={1} marginBottom={1}>
        <Tooltip title="Contact us via GitHub">
          <IconButton size="small" href={SOCIAL.github} target="_blank">
            <GithubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Join our Discord">
          <IconButton size="small" href={SOCIAL.discord} target="_blank">
            <DiscordIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Text variant="body2" fontSize="0.75rem" textAlign="center" sx={{ opacity: 0.25 }}>
        {import.meta.env.PACKAGE_VERSION}
      </Text>
    </Menu>
  );
};

export default ProfilePopover;
