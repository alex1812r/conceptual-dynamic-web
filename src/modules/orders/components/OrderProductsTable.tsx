import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TableRowEmpty } from '../../../shared/components/TableRowEmpty';
import { numberWithCommas } from '../../../shared/utils';
import { OrderProductType } from '../orders.types';

interface TableRowItemProps {
  data: OrderProductType;
}
const TableRowItem: React.FC<TableRowItemProps> = ({ data }) => {

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {data.product?.name}
      </TableCell>
      <TableCell>
        {data.count}
      </TableCell>
      <TableCell>
        {numberWithCommas(data.product?.unitPrice || 0)}
      </TableCell>
      <TableCell>
        {numberWithCommas(data.amount)}
      </TableCell>
    </TableRow>
  );
} 

export interface OrderProductsTableProps extends Omit<TableRowItemProps, 'data'> {
  data: Array<OrderProductType>;
  total: number;
}

export const OrderProductsTable: React.FC<OrderProductsTableProps> = ({ data, total }) => {
  const content = useMemo(() => {
    if(!data.length)
      return <TableRowEmpty colSpan={6} />
      
    return data.map((item) => <TableRowItem key={item.id} data={item} />)
    
  }
  , [data]);

  return (
    <TableContainer>
      <Table>
        <TableHead style={{ backgroundColor: 'transparent' }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>count</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content}
          <TableCell colSpan={3} align="right">
            <Typography component="span" fontWeight={600}>
              Total
            </Typography>
          </TableCell>
          <TableCell>
            {numberWithCommas(total)}
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  )
};