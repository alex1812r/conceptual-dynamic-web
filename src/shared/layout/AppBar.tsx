import React from 'react';
import { AppBar as MuiAppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { drawerWidth } from './config';

export interface AppBarProps {
  toggle: () => void
}
export const AppBar: React.FC<AppBarProps> = ({ toggle }) => {
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Conceptual Dinamyc 
        </Typography>
      </Toolbar>
    </MuiAppBar>
  )
};