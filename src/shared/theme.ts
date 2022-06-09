import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'rgb(3 0 71 / 9%) 0px 1px 3px',
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F6F9FC'
        }
      }
    },
  }
});