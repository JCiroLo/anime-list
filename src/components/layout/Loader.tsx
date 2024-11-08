import { FC } from "react";
import { Box, Fade, Grow, Stack } from "@mui/material";

import { Image } from "@/components";

type TLoaderProps = {
  show: boolean;
};

const Loader: FC<TLoaderProps> = ({ show }) => {
  return (
    <Fade in={show} timeout={{ exit: 2000 }} style={{ pointerEvents: show ? "auto" : "none" }}>
      <Stack position="fixed" zIndex="modal" justifyContent="center" alignItems="center" bgcolor="background.default" sx={{ inset: 0 }}>
        <Grow in={show} timeout={400}>
          <Box position="relative">
            <Box
              position="absolute"
              left="50%"
              top="50%"
              width={34 * 8}
              height={34 * 8}
              borderRadius="50%"
              border={8}
              borderColor="#ffe1f1"
              sx={{ transform: "translate(-50%, -50%)" }}
            />
            <Image src="/img/common/favicon.svg" alt="Logo" width={40} />
          </Box>
        </Grow>
      </Stack>
    </Fade>
  );
};

export default Loader;
