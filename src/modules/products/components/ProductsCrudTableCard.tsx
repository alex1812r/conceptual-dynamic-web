import React from 'react';
import { CrudTableCard } from '../../../shared/components/CrudTableCard';
import { Inventory as InventoryIcon } from '@mui/icons-material';
import { ProductType } from '../products.types';
import { Stack, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../../../shared/utils';
import { ProductStatusChip } from './ProductStatusChip';
import { CrudProps } from '../../../shared/components/CrudTable';

interface ProductsCrudTableCardProps extends Omit<CrudProps<ProductType>, 'onRead'>{
  data: Array<ProductType>
  onAdd: () => void;
  loading?: boolean
}

export const ProductsCrudTableCard: React.FC<ProductsCrudTableCardProps> = ({
  data,
  onAdd,
  onEdit,
  onDelete,
  loading
}) => {
  const navigate = useNavigate();
  
  return (
    <CrudTableCard 
      title="Products List"
      icon={<InventoryIcon fontSize="large" />}
      addButtonText="Add Product"
      onAdd={onAdd}
      onRead={(v: ProductType) => {
        navigate(`/products/${v.id}`);
      }}
      onDelete={(v: ProductType) => onDelete(v)}
      onEdit={(v: ProductType) => onEdit(v)}
      data={data}
      loading={loading}
      columns={[
        {
          title: 'Name',
          field: 'name',
          render: (item: ProductType) => {
            return (
              <Stack spacing={2} flexDirection="row" alignItems="center">
                {item.imgUrl 
                  ? <Avatar src={item.imgUrl}  variant="square" style={{ marginRight: 10 }} /> 
                  : null
                }
                {item.name}
              </Stack>
            )
          },
        },
        {
          title: 'Unit Price',
          field: 'unitPrice',
          render: (item: ProductType) => {
            return numberWithCommas(item.unitPrice)
          }
        },
        {
          title: 'Status',
          field: 'status',
          render: (item: ProductType) => {
            return (
              <ProductStatusChip status={item.status} />
            )
          }
        },
        {
          title: 'Count',
          field: 'count',
        },
      ]}
    />
  )
}