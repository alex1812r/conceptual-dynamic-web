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
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#FAFAFB'
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& tr:last-child .MuiTableCell-root': {
            borderBottom: 'none'
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600
        },
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary'
      },
      styleOverrides: {
        contained: {
          fontWeight: 500
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
        fullWidth: true,
      }
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true
      }
    }
  }
});