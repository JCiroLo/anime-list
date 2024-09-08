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

const TrailerDialog: TTrailerDialog = ({ trailer, origin, onClose }) => {
  return (
    <Dialog
      open={Boolean(trailer)}
      TransitionComponent={GrowTransition}
      maxWidth="lg"
      PaperProps={{ sx: { borderRadius: 4, backgroundColor: "transparent", backgroundImage: "none" } }}
      fullWidth
      onClose={onClose}
    >
      <DialogContent sx={{ position: "relative", padding: 0, viewTransitionName: `${origin || ""}-${trailer?.id || ""}` }}>
        <Box position="absolute" zIndex={1} sx={{ top: 8, right: 8 }}>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {trailer ? (
          trailer?.site === "youtube" ? (
            <YoutubeEmbed videoId={trailer.id} />
          ) : (
            <Image src={trailer.thumbnail} alt="Trailer" width="100%" aspect={16 / 9} />
          )
        ) : (
          <Box width="100%" bgcolor="transparent" sx={{ aspectRatio: "16 / 9" }} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrailerDialog;
