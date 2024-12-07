import { useEffect, useState } from "react";
import { Box, Fade, Grow, Stack } from "@mui/material";

import { Image, Logo } from "@/components";

import type { FC } from "react";

type TLoaderProps = {
  delay?: number;
  show: boolean;
  displayText?: boolean;
  onClose?: () => void;
};

const Loader: FC<TLoaderProps> = ({ delay = 500, show, displayText, onClose }) => {
  const [delayedShow, setDelayedShow] = useState(show);

  useEffect(() => {
    if (delay) {
      const timer = setTimeout(() => {
        setDelayedShow(show);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setDelayedShow(show);
    }
  }, [delay, show]);

  return (
    <Fade in={delayedShow} timeout={{ exit: 2000 }} style={{ pointerEvents: delayedShow ? "auto" : "none" }} onExited={onClose}>
      <Stack position="fixed" zIndex="modal" justifyContent="center" alignItems="center" bgcolor="background.default" sx={{ inset: 0 }}>
        <Grow in={delayedShow} timeout={400}>
          {displayText ? (
            <Box
              sx={{
                "& .loader__logo path": {
                  "--color-fill": (t) => t.palette.accent.main,
                  stroke: (t) => t.palette.accent.light,
                  strokeWidth: 1,
                  strokeDasharray: 380,
                  strokeDashoffset: 380,
                  animation: "logo-fade-in 2.5s ease-in-out forwards",
                },
              }}
            >
              <Logo className="loader__logo" fill="transparent" width={28 * 8} />
            </Box>
          ) : (
            <Box position="relative">
              <Box
                position="absolute"
                left="50%"
                top="50%"
                width={28 * 8}
                height={28 * 8}
                borderRadius="50%"
                border={8}
                borderColor="#ffe1f1"
                sx={{ transform: "translate(-50%, -50%)" }}
              />
              <Image src="/img/common/logo-transparent.png" alt="Logo" width={32} />
            </Box>
          )}
        </Grow>
      </Stack>
    </Fade>
  );
};

export default Loader;
