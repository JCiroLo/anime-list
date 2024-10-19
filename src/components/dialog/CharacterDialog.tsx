import { FC } from "react";
import { Button, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

import { Image } from "@/components";
import { useDialog } from "@/hooks";
import { useSession } from "@/stores";

import type { TAnimeCharacter } from "@/types/Anime";
import type { TDefaultDialogProps } from "@/utils/DialogUtils";

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

    enqueueSnackbar("Character saved to avatar list!", { severity: "success" });

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
