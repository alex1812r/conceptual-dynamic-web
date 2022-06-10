import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { StatusChip } from '../../../shared/components/StatusChip';
import { ClientStatusEnum, ClientStatusType } from '../clients.types';

interface ClientStatusChipProps {
  status: ClientStatusType;
}

/**
 * @param {object} props - Status Chip Props.
 * @param {string} props.status - Status.
 * @returns {JSX.Element} - Status Chip Component.
 */
export const ClientStatusChip: React.FC<ClientStatusChipProps> = ({
  status,
}): JSX.Element => {
  const { palette } = useTheme();
  const color = useMemo(() => {
    switch (status) {
      case ClientStatusEnum.active:
        return palette.primary.main;
      case ClientStatusEnum.inactive:
        return palette.secondary.main;
      default:
        return palette.grey[400];
    }
  }, [status, palette]);

  return <StatusChip text={status} color={color} />;
};
