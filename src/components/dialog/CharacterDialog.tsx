import { FC } from "react";
import { Button, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

import { Image } from "@/components";
import { useDialog } from "@/hooks";

import type { DialogProps } from "@mui/material";
import type { TAnimeCharacter } from "@/types/Anime";
import { useSession } from "@/stores";

type TDefaultDialogProps = Omit<DialogProps, "open" | "onClose">;
type TCharacterDialogProps = {
  character: TAnimeCharacter;
};
type TCharacterDialog = FC<TCharacterDialogProps> & {
  defaultDialogProps: () => TDefaultDialogProps;
};

const CharacterDialog: TCharacterDialog = ({ character }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dialog = useDialog();
  const avatars = useSession((state) => state.avatars);
  const { addAvatar } = useSession();

  const alreadyExists = avatars.includes(character.image.large);

  const handleSaveAvatar = () => {
    addAvatar(character.image.large);

    enqueueSnackbar("Character saved to avatar list!", { variant: "success" });

    dialog.close();
  };

  return (
    <>
      {character?.name?.userPreferred && <DialogTitle>{character.name.userPreferred}</DialogTitle>}
      <DialogContent>
        <Stack spacing={2} alignItems="center">
          <Image src={character.image} alt={character?.name?.userPreferred || "Character image"} borderRadius={2} width="100%" />
          <Button disabled={alreadyExists} fullWidth onClick={handleSaveAvatar}>
            {alreadyExists ? "Already saved" : "Add to avatar list"}
          </Button>
        </Stack>
      </DialogContent>
    </>
  );
};

CharacterDialog.defaultDialogProps = () => ({});

export default CharacterDialog;
