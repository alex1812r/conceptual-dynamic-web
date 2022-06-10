import React from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
import { HourglassDisabled } from '@mui/icons-material';

interface TableRowEmptyProps {
  colSpan?: number;
}
export const TableRowEmpty: React.FC<TableRowEmptyProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Typography 
          display="flex"
          style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}
          color="gray">
          <HourglassDisabled /> Not found Data
        </Typography>
      </TableCell>
    </TableRow>
  )
}