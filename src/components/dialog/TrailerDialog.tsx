import { FC } from "react";
import { DialogContent } from "@mui/material";

import { Image, YoutubeEmbed } from "@/components";

import type { DialogProps } from "@mui/material";
import type { TAnimeTrailer } from "@/types/Anime";

type TDefaultDialogProps = Omit<DialogProps, "open" | "onClose">;
type TTrailerDialog = FC<{
  trailer: TAnimeTrailer | null;
}> & {
  defaultDialogProps: () => TDefaultDialogProps;
};

const TrailerDialog: TTrailerDialog = ({ trailer }) => {
  return (
    <DialogContent sx={{ position: "relative", padding: 0 }}>
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
