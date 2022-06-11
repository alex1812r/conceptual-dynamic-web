import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { StatusChip } from '../../../shared/components/StatusChip';
import { OrderStatusEnum, OrderStatusType } from '../orders.types';

interface OrderStatusChipProps {
  status: OrderStatusType;
}

export const OrderStatusChip: React.FC<OrderStatusChipProps> = ({
  status,
}): JSX.Element => {
  const { palette } = useTheme();
  const color = useMemo(() => {
    switch (status) {
      case OrderStatusEnum.pending:
        return palette.primary.main;
      case OrderStatusEnum.paid:
        return palette.success.main;
      case OrderStatusEnum.rejected:
        return palette.error.main;
      default:
        return palette.grey[400];
    }
  }, [status, palette]);

  return <StatusChip text={status} color={color} />;
};
