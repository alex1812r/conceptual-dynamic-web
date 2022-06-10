import React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';

interface MainLoaderProps {
  message?: string;
}

export function MainLoader({ message }: MainLoaderProps): JSX.Element {
  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid item>
        <CircularProgress size="5rem" />
      </Grid>
      {message ? (
        <Grid item>
          <Typography variant="subtitle2">{message}</Typography>
        </Grid>
      ) : null}
    </Grid>
  );
}
