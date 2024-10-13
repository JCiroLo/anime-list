import { FC } from "react";
import { Box, Fade, Grow, Stack } from "@mui/material";
import Image from "@/components/ui/Image";

type TLoader = FC<{ show: boolean }>;

const Loader: TLoader = ({ show }) => {
  return (
    <Fade in={show} timeout={{ exit: 2000 }} style={{ pointerEvents: show ? "auto" : "none" }}>
      <Stack position="fixed" zIndex="modal" justifyContent="center" alignItems="center" bgcolor="background.default" sx={{ inset: 0 }}>
        <Grow in={show}>
          <Box>
            <Image src="/img/common/logo-transparent.png" alt="Logo" width={32} />
          </Box>
        </Grow>
      </Stack>
    </Fade>
  );
};

export default Loader;
