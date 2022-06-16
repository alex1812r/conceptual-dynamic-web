import React from 'react';
import { Person as PersonIcon } from '@mui/icons-material';
import moment from 'moment';
import { ClientType } from '../clients.types';
import { CrudProps } from '../../../shared/components/CrudTable';
import { useNavigate } from 'react-router-dom';
import { CrudTableCard } from '../../../shared/components/CrudTableCard';
import { ClientStatusChip } from './ClientStatusChip';
import { PaginationType } from '../../../shared/hooks';

interface ClientsCrudTableCardProps extends Omit<CrudProps<ClientType>, 'onRead'>{
  data: Array<ClientType>
  onAdd: () => void;
  loading?: boolean;
  pagination: PaginationType
}


export const ClientsCrudTableCard: React.FC<ClientsCrudTableCardProps> = ({
  data,
  onAdd,
  onEdit,
  onDelete,
  loading,
  pagination
}) => {
  const navigate = useNavigate();
  
  return (
    <CrudTableCard 
      title="Clients List"
      icon={<PersonIcon fontSize="large" />}
      addButtonText="Add Client"
      onAdd={onAdd}
      onRead={(v: ClientType) => {
        navigate(`/clients/${v.id}`);
      }}
      onDelete={(v: ClientType) => onDelete(v)}
      onEdit={(v: ClientType) => onEdit(v)}
      data={data}
      loading={loading}
      pagination={pagination}
      loaderMessage="Loading Clients..."
      columns={[
        {
          title: 'CI',
          field: 'dni',
        },
        {
          title: 'Name',
          field: 'name',
        },
        {
          title: 'email',
          field: 'email',
        },
        {
          title: 'Status',
          field: 'status',
          render: (item: ClientType) => {
            return <ClientStatusChip status={item.status} />
          }
        },
        {
          title: 'Count',
          field: 'count',
          render: (item: ClientType) => {
            return moment(item.dateOfBirth).format('YYYY/MM/DD')
          }
        },
      ]}
    />
  )
}