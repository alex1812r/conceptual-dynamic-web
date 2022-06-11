import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { theme } from './shared/theme';
import { Routes } from './routes';
import { Layout } from './shared/layout/Layout';
import { SnackbarProvider } from './shared/components/SnackbarProvider';

export const Application: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
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
    </LocalizationProvider>
  );
}
