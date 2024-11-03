import { FC } from "react";
import { Box, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

import { Avatar, ErrorMessage, Text } from "@/components";
import { GhostIcon, TrashIcon } from "@/icons";
import { useDialog } from "@/hooks";
import { useSession } from "@/stores";

import type { TList } from "@/types/List";
import type { TDefaultDialogProps } from "@/utils/DialogUtils";

type TAvatarManagerProps = {
  list?: TList;
  onSave?: () => void;
};
type TAvatarManager = FC<TAvatarManagerProps> & {
  defaultDialogProps: () => TDefaultDialogProps;
};

const AvatarManager: TAvatarManager = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dialog = useDialog();
  const avatars = useSession((state) => state.avatars);
  const { removeAvatar, updateAvatar } = useSession();

  const handleChooseAvatar = (avatar: string) => {
    if (avatar) {
      updateAvatar(avatar);
      enqueueSnackbar("Avatar updated!", { severity: "success" });
    } else {
      enqueueSnackbar("Avatar not updated!", { severity: "error" });
    }

    dialog.close();
  };

  const handleRemoveAvatar = (avatar: string) => {
    if (avatar) {
      removeAvatar(avatar);
      enqueueSnackbar("Avatar removed!", { severity: "success" });
    } else {
      enqueueSnackbar("Avatar not removed!", { severity: "error" });
    }
  };

  return (
    <>
      <DialogTitle>Choose your avatar</DialogTitle>
      <DialogContent>
        <Stack>
          {avatars.length ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {avatars.map((avatar) => (
                <Box
                  key={avatar}
                  position="relative"
                  sx={{
                    "&:hover .avatar-manager__avatar-actions": {
                      opacity: 1,
                      visibility: "visible",
                      transform: "translate(25%, 25%)",
                    },
                  }}
                >
                  <IconButton key={avatar} sx={{ padding: 0 }} onClick={() => handleChooseAvatar(avatar)}>
                    <Avatar size={64} src={avatar} />
                  </IconButton>
                  <Box
                    className="avatar-manager__avatar-actions"
                    position="absolute"
                    zIndex={1}
                    bottom={0}
                    right={0}
                    bgcolor="white"
                    borderRadius="50%"
                    sx={{
                      opacity: 0,
                      visibility: "hidden",
                      transform: "translate(25%, 50%)",
                      transition: (t) => t.transitions.create(["opacity", "visibility", "transform"]),
                    }}
                  >
                    <IconButton size="small" color="error" onClick={() => handleRemoveAvatar(avatar)}>
                      <TrashIcon sx={{ fontSize: "0.825em" }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            <ErrorMessage
              icon={<GhostIcon sx={{ fontSize: 48 }} />}
              title="It looks like you have no avatars."
              subtitle={
                <>
                  You can save avatars going to your faviorite anime, then in the{" "}
                  <Text component="strong" fontWeight="bold" inline>
                    characters{" "}
                  </Text>
                  section, select the one you want and save it!
                </>
              }
              slotProps={{
                root: {
                  sx: {
                    opacity: 0.5,
                  },
                },
                title: {
                  fontSize: "1.5rem",
                  marginBottom: 1,
                },
              }}
              centered
            />
          )}
        </Stack>
      </DialogContent>
    </>
  );
};

AvatarManager.defaultDialogProps = () => ({
  maxWidth: "sm",
  fullWidth: true,
  PaperProps: {
    sx: (t) => ({
      bgcolor: t.palette.background.dialog,
      borderRadius: 4,
    }),
  },
});

export default AvatarManager;
