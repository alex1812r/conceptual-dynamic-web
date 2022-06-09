import React, { useCallback, useMemo, useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { AppBar } from './AppBar';
import { drawerWidth } from './config';
import { Sidebar } from './Sisebar';

export interface LayoutProps {
  children: React.ReactNode;
  window?: () => Window;
}

export const Layout: React.FC<LayoutProps> = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);

  const container = useMemo(() =>
    window !== undefined 
      ? () => window().document.body 
      : undefined, 
  [window]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar toggle={handleDrawerToggle} />
      <Sidebar 
        mobileOpen={mobileOpen}
        container={container}
        toggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}