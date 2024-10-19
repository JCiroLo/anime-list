import { alpha, Chip } from "@mui/material";

import type { FC } from "react";

type TTagProps = {
  label: string;
};

const Tag: FC<TTagProps> = ({ label }) => {
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        height: "auto",
        bgcolor: (t) => alpha(t.palette.background.default, 0.5),
        backdropFilter: "blur(8px) saturate(1.5) ",
        "& .MuiChip-label": {
          paddingX: 0.75,
          paddingY: 0.25,
          fontSize: "0.75em",
        },
      }}
    />
  );
};

export default Tag;
