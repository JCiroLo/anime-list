import { FC } from "react";
import { DialogContent } from "@mui/material";

import { Image, YoutubeEmbed } from "@/components";

import type { TAnimeTrailer } from "@/types/Anime";
import type { TDefaultDialogProps } from "@/utils/DialogUtils";

type TTrailerDialogProps = {
  trailer: TAnimeTrailer | null;
};
type TTrailerDialog = FC<TTrailerDialogProps> & {
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
