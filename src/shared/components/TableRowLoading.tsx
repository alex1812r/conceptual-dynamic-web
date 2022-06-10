import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { MainLoader } from './MainLoader';

interface TableRowLoadingProps {
  colSpan?: number;
  message?: string;
}

export const TableRowLoading: React.FC<TableRowLoadingProps> = ({
  colSpan,
  message,
}): JSX.Element => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <MainLoader message={message} />
      </TableCell>
    </TableRow>
  );
};
