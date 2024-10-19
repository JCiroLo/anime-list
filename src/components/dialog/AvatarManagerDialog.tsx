import { FC } from "react";
import { Box, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";

import { Avatar, ErrorMessage, Text } from "@/components";
import { MoodConfuzedIcon, TrashIcon } from "@/icons";
import { useDialog } from "@/hooks";
import { useSession } from "@/stores";

import type { DialogProps } from "@mui/material";
import type { TList } from "@/types/List";
import { useSnackbar } from "notistack";

type TDefaultDialogProps = Omit<DialogProps, "open" | "onClose">;
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
      enqueueSnackbar("Avatar updated!", { variant: "success" });
    } else {
      enqueueSnackbar("Avatar not updated!", { variant: "error" });
    }

    dialog.close();
  };

  const handleRemoveAvatar = (avatar: string) => {
    if (avatar) {
      removeAvatar(avatar);
      enqueueSnackbar("Avatar removed!", { variant: "success" });
    } else {
      enqueueSnackbar("Avatar not removed!", { variant: "error" });
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
              icon={<MoodConfuzedIcon sx={{ fontSize: 48 }} />}
              title="Hey, it looks like you have no avatars."
              subtitle={
                <>
                  To save avatars you can navigate to the{" "}
                  <Text component="strong" fontWeight="bold" inline>
                    characters{" "}
                  </Text>
                  section within the anime details, select the character you want and finally click{" "}
                  <Text component="strong" fontWeight="bold" inline>
                    Save
                  </Text>
                  .
                </>
              }
              slotProps={{
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
