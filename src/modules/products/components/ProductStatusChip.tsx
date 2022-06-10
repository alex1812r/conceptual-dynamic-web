import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { StatusChip } from '../../../shared/components/StatusChip';
import { ProductStatusEnum, ProductStatusType } from '../products.types';

interface ProductStatusChipProps {
  status: ProductStatusType;
}

/**
 * @param {object} props - Status Chip Props.
 * @param {string} props.status - Status.
 * @returns {JSX.Element} - Status Chip Component.
 */
export const ProductStatusChip: React.FC<ProductStatusChipProps> = ({
  status,
}): JSX.Element => {
  const { palette } = useTheme();
  const color = useMemo(() => {
    switch (status) {
      case ProductStatusEnum.available:
        return palette.success.main;
      case ProductStatusEnum.soldout:
        return palette.error.main;
      default:
        return palette.grey[400];
    }
  }, [status, palette]);

  return <StatusChip text={status} color={color} />;
};
