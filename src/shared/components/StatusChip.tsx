import React from 'react';
import { capitalizeFirstLetter } from '../utils';
import { Box, useTheme } from '@mui/material';

interface StatusChipProps {
  text: string;
  color: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  text,
  color,
}): JSX.Element => {
  const { palette } = useTheme();
  return (
    <Box 
      display="inline-flex"
      padding="8px 12px"
      minWidth={50}
      textAlign="center"
      height={31}
      fontSize={12}
      fontWeight="bold"
      borderRadius={100}
      color={palette.common.white}
      bgcolor={color}>
      {capitalizeFirstLetter(text)}
    </Box>
  );
};
