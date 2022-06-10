import React from 'react';
import { Stack } from '@mui/material';

interface PageCenteredProps {
  children: React.ReactNode
}
export const PageCentered: React.FC<PageCenteredProps> = ({ children }): JSX.Element => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      style={{ height: '100%' }}
    >
      {children}
    </Stack>
  );
};
