import { useEffect, useRef, useState } from "react";
import { InputBase, Typography } from "@mui/material";

import type { FC, ChangeEvent, CSSProperties, KeyboardEvent } from "react";
import type { InputBaseProps, TypographyProps } from "@mui/material";

type TRichProps = TTextProps & {
  html: string;
};
type TEditableProps = Omit<TTextProps, "onChange"> & {
  value: string;
  maxLength?: number;
  slotProps?: {
    input?: InputBaseProps;
  };
  onChange: (value: string) => void;
};
export type TTextProps = TypographyProps & {
  maxLines?: number;
  overflow?: CSSProperties["overflow"];
  textWrap?: CSSProperties["textWrap"];
  wordBreak?: CSSProperties["wordBreak"];
  inline?: boolean;
};
type TText = FC<TTextProps> & {
  Rich: FC<TRichProps>;
  Editable: FC<TEditableProps>;
};

const Text: TText = ({ children, maxLines, overflow, textWrap, wordBreak, inline, ...rest }) => {
  return (
    <Typography
      {...rest}
      sx={{
        ...rest.sx,
        textWrap,
        wordBreak,
        display: inline ? "inline" : "-webkit-box",
        overflow: overflow || "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: maxLines,
      }}
    >
      {children}
    </Typography>
  );
};

const Rich: FC<TRichProps> = ({ html, ...rest }) => {
  return <Text {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
};

const Editable: FC<TEditableProps> = ({ value, maxLength, slotProps, onChange, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    onChange(currentValue);
  };

  const handleInputBlur = () => {
    handleSubmit();
  };

  const handleInputKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return isEditing ? (
    <InputBase
      inputRef={inputRef}
      inputProps={{ maxLength, style: { padding: 0 } }}
      sx={{ outline: 2, outlineOffset: 1, borderRadius: 1 }}
      {...slotProps?.input}
      value={currentValue}
      onBlur={handleInputBlur}
      onKeyUp={handleInputKeyUp}
      onChange={handleInputChange}
    />
  ) : (
    <Text {...rest} sx={{ ...rest.sx, cursor: "pointer" }} onClick={handleTextClick}>
      {value}
    </Text>
  );
};

Text.Rich = Rich;
Text.Editable = Editable;

export default Text;
