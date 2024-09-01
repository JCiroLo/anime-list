import { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";

type TTextProps = TypographyProps & {
  maxLines?: number;
};
type TText = FC<TTextProps>;

const Text: TText = ({ children, maxLines, ...rest }) => {
  return (
    <Typography
      sx={{
        ...rest.sx,
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: maxLines,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default Text;
