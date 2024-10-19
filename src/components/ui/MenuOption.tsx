import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import type { FC, ReactNode } from "react";
import type { ListItemTextProps, MenuItemProps, SvgIconProps } from "@mui/material";

type TMenuOptionProps = {
  icon: FC<SvgIconProps>;
  text: string | ReactNode;
  props?: {
    button?: MenuItemProps;
    icon?: SvgIconProps;
    text?: ListItemTextProps;
  };
  onClick: () => void;
};

const MenuOption: FC<TMenuOptionProps> = ({ icon, text, props, onClick }) => {
  const Icon = icon;

  return (
    <MenuItem {...props?.button} onClick={onClick}>
      <ListItemIcon style={{ minWidth: 24 }}>
        <Icon {...props?.icon} fontSize="small" />
      </ListItemIcon>
      <ListItemText {...props?.text} primary={text}></ListItemText>
    </MenuItem>
  );
};

export default MenuOption;
