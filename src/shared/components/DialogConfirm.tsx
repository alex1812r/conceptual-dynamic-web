import React, { useMemo } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

export interface DialogConfirmProps extends DialogProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirming?: boolean;
}

export const DialogConfirm: React.FC<DialogConfirmProps> = ({
  title,
  children,
  onCancel,
  onConfirm,
  confirming,
  ...restProps
}): JSX.Element => {
  const { palette } = useTheme();

  const confirmingLoader = useMemo(() => {
    return confirming ? (
      <CircularProgress 
        size="1rem" 
        style={{
          color: palette.common.white,
          marginRight: 5
        }}
      />
    ) : null;
  }, [confirming, palette.common.white]);

  return (
    <Dialog {...restProps}>
      <DialogContent>
        <Typography variant="h6">{title}</Typography>
      </DialogContent>
      <Divider />
      <DialogContent>
        {children}
      </DialogContent>
      <Divider />
      <DialogContent>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button
              disabled={confirming}
              onClick={() => onCancel()}
              variant="outlined"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => onConfirm()}>
              {confirmingLoader}
              Confirm
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
