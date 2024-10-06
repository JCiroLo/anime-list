import { FC } from "react";
import { Box, DialogContent, IconButton } from "@mui/material";

import { Image, YoutubeEmbed } from "@/components";
import { CloseIcon } from "@/icons";
import { useDialog } from "@/hooks";

import type { DialogProps } from "@mui/material";
import type { TAnimeTrailer } from "@/types/Anime";

type TDefaultDialogProps = Omit<DialogProps, "open" | "onClose">;
type TTrailerDialog = FC<{
  trailer: TAnimeTrailer | null;
}> & {
  defaultDialogProps: () => TDefaultDialogProps;
};

const TrailerDialog: TTrailerDialog = ({ trailer }) => {
  const dialog = useDialog();

  const handleClose = () => {
    dialog.close();
  };

  return (
    <DialogContent sx={{ position: "relative", padding: 0 }}>
      <Box position="absolute" zIndex={1} sx={{ top: 8, right: 8 }}>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {trailer ? (
        trailer?.site === "youtube" ? (
          <YoutubeEmbed videoId={trailer.id} />
        ) : (
          <Image src={trailer.thumbnail} alt="Trailer thumbnail" width="100%" aspect={16 / 9} />
        )
      ) : null}
    </DialogContent>
  );
};

TrailerDialog.defaultDialogProps = () => ({
  maxWidth: "lg",
  fullWidth: true,
});

export default TrailerDialog;
