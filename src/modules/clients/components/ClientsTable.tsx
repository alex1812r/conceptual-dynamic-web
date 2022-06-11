import React, { useCallback, useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ClientType } from '../clients.types';
import { ActionsMenuIconButton } from '../../../shared/components/ActionsMenuIconButton';
import { ClientStatusChip } from './ClientStatusChip';
import { TableRowLoading } from '../../../shared/components/TableRowLoading';
import { TableRowEmpty } from '../../../shared/components/TableRowEmpty';

interface TableRowItemProps {
  data: ClientType;
  onDelete: (client: ClientType) => void;
}
const TableRowItem: React.FC<TableRowItemProps> = ({ data, onDelete }) => {
  const [openActionsMenu, setOpenActionsMenu] = useState(false);
  const navigate = useNavigate();
  
  const handleOnDelete = useCallback(() => {
    onDelete(data)
    setOpenActionsMenu(false)
  }, [data, onDelete])

  const handleOnDetails = useCallback(() => {
    navigate(`/clients/${data.id}`)
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
      <TableCell component="th" scope="row">{data.dni}</TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>
        <ClientStatusChip status={data.status} />
      </TableCell>
      <TableCell>
        {moment(data.dateOfBirth).format('YYYY/MM/DD')}
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

export interface ClientsTableProps extends Omit<TableRowItemProps, 'data'> {
  data: Array<ClientType>;
  loading?: boolean;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({ data, loading, onDelete }) => {
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
            <TableCell>CI</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date Of Birth</TableCell>
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