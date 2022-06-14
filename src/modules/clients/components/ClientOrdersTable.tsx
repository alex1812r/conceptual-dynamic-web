import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { TableRowEmpty } from '../../../shared/components/TableRowEmpty';
import { OrderType } from '../../orders/orders.types';
import { OrderStatusChip } from '../../orders/components/OrderStatusChip';
import { numberWithCommas } from '../../../shared/utils';

interface TableRowItemProps {
  data: OrderType;
}
const TableRowItem: React.FC<TableRowItemProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell component="th" scope="row">{data.id}</TableCell>
      <TableCell>
        {moment(data.orderDate).format('YYYY/MM/DD')}
      </TableCell>
      <TableCell>
        <OrderStatusChip status={data.status} />
      </TableCell>
      <TableCell>
        {numberWithCommas(data.total)}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => navigate(`/orders/${data.id}`)}>
          <VisibilityIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
} 

export interface ClientOrdersTableProps extends Omit<TableRowItemProps, 'data'> {
  data: Array<OrderType>;
}

export const ClientOrdersTable: React.FC<ClientOrdersTableProps> = ({ data }) => {
  const content = useMemo(() => {
    if(!data.length)
      return <TableRowEmpty colSpan={6} />
      
    return data.map((item) => <TableRowItem key={item.id} data={item} />)
    
  }
  , [data]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content}
        </TableBody>
      </Table>
    </TableContainer>
  )
};