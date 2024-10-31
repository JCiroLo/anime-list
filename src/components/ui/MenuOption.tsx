import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import type { FC, ReactNode } from "react";
import type { ListItemTextProps, MenuItemProps, SvgIconProps } from "@mui/material";

type TMenuOptionProps = {
  icon: FC<SvgIconProps>;
  text: string | ReactNode;
  slotProps?: {
    button?: MenuItemProps;
    icon?: SvgIconProps;
    text?: ListItemTextProps;
  };
  onClick: () => void;
};

const MenuOption: FC<TMenuOptionProps> = ({ icon, text, slotProps, onClick }) => {
  const Icon = icon;

  return (
    <MenuItem {...slotProps?.button} onClick={onClick}>
      <ListItemIcon style={{ minWidth: 24 }}>
        <Icon {...slotProps?.icon} fontSize="small" />
      </ListItemIcon>
      <ListItemText {...slotProps?.text} primary={text}></ListItemText>
    </MenuItem>
  );
};

export default MenuOption;
