import React, { createContext, useCallback, useContext, useState } from 'react';
import { Alert, Snackbar as MuiSnackbar, AlertColor } from '@mui/material'

type SnackbarContextProps = [
  (props: { color: AlertColor, message: string }) => void
];
const SnackbarContext = createContext<SnackbarContextProps>([() => {} ]);
export const useSnackbar = () => useContext(SnackbarContext);

export interface SnackbarProviderProps { 
  children: React.ReactNode
}
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<AlertColor>('info');
  const [message, setMessage] = useState('');

  const handleOnClose = useCallback(() => {
    setOpen(false);
  }, []);

  const dispatch = useCallback(({ color, message }: { color: AlertColor, message: string }) => {
    setColor(color)
    setMessage(message)
    setOpen(true);
  }, [])

  return (
    <SnackbarContext.Provider value={[dispatch]}>
      <MuiSnackbar open={open} onClose={handleOnClose} autoHideDuration={5000}>
        <Alert
          severity={color}
          variant="filled"
          elevation={6}>
          {message}
        </Alert>
      </MuiSnackbar>
      {children}
    </SnackbarContext.Provider>
  )
};