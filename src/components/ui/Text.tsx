import { CSSProperties, FC } from "react";
import { Typography, TypographyProps } from "@mui/material";

type TRich = FC<
  TTextProps & {
    html: string;
  }
>;
export type TTextProps = TypographyProps & {
  maxLines?: number;
  textWrap?: CSSProperties["textWrap"];
  inline?: boolean;
};
type TText = FC<TTextProps> & {
  Rich: TRich;
};

const Text: TText = ({ children, maxLines, textWrap, inline, ...rest }) => {
  return (
    <Typography
      sx={{
        ...rest.sx,
        textWrap,
        display: inline ? "inline" : "-webkit-box",
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
