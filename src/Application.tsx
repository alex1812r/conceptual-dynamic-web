import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './shared/theme';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import { Layout } from './shared/layout/Layout';
import { SnackbarProvider } from './shared/components/SnackbarProvider';

export const Application: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
