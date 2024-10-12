import { FC } from "react";
import { Avatar as MuiAvatar } from "@mui/material";

import type { AvatarProps } from "@mui/material";

type TAvatarProps = AvatarProps & {
  size?: number;
};

const Avatar: FC<TAvatarProps> = ({ size, ...props }) => {
  return <MuiAvatar variant="rounded" {...props} sx={{ ...props.sx, width: size, height: size }} />;
};

export default Avatar;
