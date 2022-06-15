import React from 'react';
import { ShoppingBag as ShoppingIcon } from '@mui/icons-material';
import moment from 'moment';
import { OrderType } from '../orders.types';
import { CrudProps } from '../../../shared/components/CrudTable';
import { useNavigate } from 'react-router-dom';
import { CrudTableCard } from '../../../shared/components/CrudTableCard';
import { OrderStatusChip } from './OrderStatusChip';
import { numberWithCommas } from '../../../shared/utils';

interface ClientsCrudTableCardProps extends Omit<CrudProps<OrderType>, 'onRead'>{
  data: Array<OrderType>
  onAdd: () => void;
  loading?: boolean
}

export const OrdersCrudTableCard: React.FC<ClientsCrudTableCardProps> = ({
  data,
  onAdd,
  onEdit,
  onDelete,
  loading
}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <CrudTableCard 
        title="Clients List"
        icon={<ShoppingIcon fontSize="large" />}
        addButtonText="Add Client"
        onAdd={onAdd}
        onRead={(v: OrderType) => {
          navigate(`/orders/${v.id}`);
        }}
        onDelete={(v: OrderType) => onDelete(v)}
        onEdit={(v: OrderType) => onEdit(v)}
        data={data}
        loading={loading}
        columns={[
          {
            title: '#',
            field: 'id',
          },
          {
            title: 'Client',
            field: 'client',
            render: (item: OrderType) => {
              return item.client?.name
            }
          },
          {
            title: 'Order Date',
            field: 'orderDate',
            render: (item: OrderType) => {
              return moment(item.orderDate).format('YYYY/MM/DD')
            }
          },
          {
            title: 'Status',
            field: 'count',
            render: (item: OrderType) => {
              return <OrderStatusChip status={item.status} />
            }
          },
          {
            title: 'Total',
            field: 'total',
            render: (item: OrderType) => {
              return numberWithCommas(item.total);
            }
          }
        ]}
      />
    </>
  )
}