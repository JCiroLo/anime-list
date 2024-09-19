import { FC } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";

import { GrowTransition, Image, YoutubeEmbed } from "@/components";
import { CloseIcon } from "@/icons";

import type { TAnimeTrailer } from "@/types/Anime";

type TTrailerDialog = FC<{
  trailer: TAnimeTrailer | null;
  origin: string | null;
  onClose?: () => void;
}>;

const TrailerDialog: TTrailerDialog = ({ trailer, onClose }) => {
  return (
    <Dialog
      open={Boolean(trailer)}
      maxWidth="lg"
      PaperProps={{ elevation: 0, sx: { borderRadius: 4 } }}
      TransitionComponent={GrowTransition}
      fullWidth
      onClose={onClose}
    >
      <DialogContent sx={{ position: "relative", padding: 0 }}>
        <Box position="absolute" zIndex={1} sx={{ top: 8, right: 8 }}>
          <IconButton size="small" onClick={onClose}>
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
    </Dialog>
  );
};

export default TrailerDialog;
