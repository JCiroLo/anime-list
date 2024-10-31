import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import type { FC } from "react";

type TDebugBooleanProps = {
  value: boolean;
  label: string;
};

type TDebug = FC & {
  Boolean: FC<TDebugBooleanProps>;
};

const Debug: TDebug = () => {
  throw new Error("Should not be rendered");
};

const DebugBoolean: FC<TDebugBooleanProps> = ({ value, label }) => {
  return (
    <ListItem>
      <ListItemIcon sx={{ minWidth: 32 }}>
        <Box width={16} height={16} borderRadius={2} bgcolor={value ? "success.main" : "error.main"} />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

Debug.Boolean = DebugBoolean;

export default Debug;
