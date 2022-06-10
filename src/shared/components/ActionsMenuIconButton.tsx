import React from 'react';
import { MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { IconButtonMenu, IconButtonMenuProps } from './IconButtonMenu';

export interface ActionsMenuIconButtonProps
  extends Omit<IconButtonMenuProps, 'icon'> {
  actions: Array<{
    value: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
  }>;
}

export const ActionsMenuIconButton: React.FC<ActionsMenuIconButtonProps> = ({
  actions,
  ...iconButtonMenuProps
}): JSX.Element => {
  return (
    <IconButtonMenu icon={<MoreVert />} {...iconButtonMenuProps}>
      {actions.map(({ onClick, value, disabled }, k) => (
        <MenuItem
          key={`menu-item-${k + 1}`}
          onClick={() => onClick()}
          disabled={disabled}
        >
          {value}
        </MenuItem>
      ))}
    </IconButtonMenu>
  );
};

ActionsMenuIconButton.defaultProps = {
  size: 'small',
};
