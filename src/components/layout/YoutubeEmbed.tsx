import { FC, ReactNode } from "react";
import { Box } from "@mui/material";

import type { BoxProps } from "@mui/material";

type TYoutubeEmbedProps = {
  children?: ReactNode;
  videoId: string;
  props?: {
    container: BoxProps;
  };
};

const YoutubeEmbed: FC<TYoutubeEmbedProps> = ({ children, videoId, props }) => {
  return (
    <Box {...props?.container} width={{ xs: "100%", sm: "100%" }} sx={{ aspectRatio: "16 / 9" }}>
      <lite-youtube
        id="test-jsapi"
        videoid={videoId}
        posterquality="maxresdefault"
        params="loop=1&modestbranding=1&playsinline=1&rel=0"
        autoload
      >
        {children}
      </lite-youtube>
    </Box>
  );
};

export default YoutubeEmbed;
