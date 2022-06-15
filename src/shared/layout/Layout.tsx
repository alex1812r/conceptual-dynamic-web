import React, { useCallback, useMemo, useState } from 'react';
import { Box, Stack, Toolbar } from '@mui/material';
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
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar toggle={handleDrawerToggle} />
      <Sidebar 
        mobileOpen={mobileOpen}
        container={container}
        toggle={handleDrawerToggle}
      />
      <Box
        component="main"
        overflow="hidden"
        sx={{ 
          flexGrow: 1, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Stack height="100%">
          <Toolbar />
          <Box flexGrow={1} sx={{ p: 3 }} overflow="auto">
            {children}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}