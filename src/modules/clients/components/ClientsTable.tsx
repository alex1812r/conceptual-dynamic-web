import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ClientType } from '../clients.types';

export interface ClientsTableProps {
  data: Array<ClientType>
}

export const ClientsTable: React.FC<ClientsTableProps> = ({ data }) => {
  const content = useMemo(() =>
    data.map((item) =>
      <TableRow key={item.id}>
        <TableCell component="th" scope="row">{item.id}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.lastname}</TableCell>
      </TableRow>
    )
  , [data]);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>lastname</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content}
        </TableBody>
      </Table>
    </TableContainer>
  )
};