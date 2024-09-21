import { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";
import { PropsOf } from "@emotion/react";

type TRich = FC<
  PropsOf<TText> & {
    html: string;
  }
>;
type TText = FC<
  TypographyProps & {
    maxLines?: number;
  }
> & {
  Rich: TRich;
};

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

const Rich: TRich = ({ html, ...rest }) => {
  return <Text {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
};

Text.Rich = Rich;

export default Text;
