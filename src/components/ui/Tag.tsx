import { FC } from "react";
import { alpha, Chip } from "@mui/material";

type TTag = FC<{
  label: string;
}>;

const Tag: TTag = ({ label }) => {
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
