import React, { useEffect, useRef, useState } from 'react';
import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuProps,
} from '@mui/material';

export interface IconButtonMenuProps extends Omit<IconButtonProps, 'onClick'> {
  icon: React.ReactNode;
  menuProps?: Omit<MenuProps, 'open' | 'onClose' | 'anchorEl'>;
  open?: boolean;
  toggleMenu?: (v: boolean) => void;
}

export const IconButtonMenu: React.FC<IconButtonMenuProps> = ({
  icon,
  children,
  menuProps,
  open,
  toggleMenu,
  ...iconButtonProps
}): JSX.Element => {
  const menuRef = useRef<HTMLButtonElement | null>(null);
  const [localOpen, setLocalOpen] = useState(false);

  const defaultMenuProps = {};
  if (menuProps) Object.assign(defaultMenuProps, menuProps);

  useEffect(() => {
    if (typeof open === 'boolean') setLocalOpen(open);
  }, [open]);

  return (
    <>
      <IconButton
        ref={menuRef}
        onClick={() => {
          if (toggleMenu) toggleMenu(true);
          else setLocalOpen(true);
        }}
        {...iconButtonProps}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={menuRef.current}
        keepMounted
        open={localOpen}
        onClose={() => {
          if (toggleMenu) toggleMenu(false);
          else setLocalOpen(false);
        }}
        {...defaultMenuProps}
      >
        {children}
      </Menu>
    </>
  );
};

IconButtonMenu.defaultProps = {
  menuProps: {
    keepMounted: true,
  },
};
