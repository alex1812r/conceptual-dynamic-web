import React, { useCallback, useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ActionsMenuIconButton } from '../../../shared/components/ActionsMenuIconButton';
import { TableRowLoading } from '../../../shared/components/TableRowLoading';
import { TableRowEmpty } from '../../../shared/components/TableRowEmpty';
import { OrderType } from '../orders.types';
import { OrderStatusChip } from './OrderStatusChip';
import { numberWithCommas } from '../../../shared/utils';

interface TableRowItemProps {
  data: OrderType;
  onDelete: (order: OrderType) => void;
}
const TableRowItem: React.FC<TableRowItemProps> = ({ data, onDelete }) => {
  const [openActionsMenu, setOpenActionsMenu] = useState(false);
  const navigate = useNavigate();
  
  const handleOnDelete = useCallback(() => {
    onDelete(data)
    setOpenActionsMenu(false)
  }, [data, onDelete])

  const handleOnDetails = useCallback(() => {
    navigate(`/orders/${data.id}`)
    setOpenActionsMenu(false)
  }, [data.id, navigate])

  const actions = useMemo(() => 
    [
      { value: 'Details', onClick: handleOnDetails },
      { value: 'Edit', onClick: () => console.log('Edit') },
      { value: 'Delete', onClick: handleOnDelete },
    ]
  , [handleOnDelete, handleOnDetails]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">{data.id}</TableCell>
      <TableCell>{data.client?.name}</TableCell>
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
        <ActionsMenuIconButton
          open={openActionsMenu}
          toggleMenu={(val) => setOpenActionsMenu(val)}
          actions={actions}
        />
      </TableCell>
    </TableRow>
  );
} 

export interface OrdersTableProps extends Omit<TableRowItemProps, 'data'> {
  data: Array<OrderType>;
  loading?: boolean;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ data, loading, onDelete }) => {
  const content = useMemo(() => {
    if(loading) 
      return <TableRowLoading colSpan={6} message="Loading Products..." />;

    if(!data.length)
      return <TableRowEmpty colSpan={6} />
      
    return data.map((item) => <TableRowItem key={item.id} data={item} onDelete={onDelete} />)
    
  }
  , [data, loading, onDelete]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Client</TableCell>
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