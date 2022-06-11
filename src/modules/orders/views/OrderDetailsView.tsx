import { Card, CardContent } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageLoader } from '../../../shared/components/PageLoader';
import { useOrderDetails } from '../orders.hooks';

export const OrderDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useOrderDetails({ id: Number(id) })
  
  if(loading) return <PageLoader message="Loading Order..." />

  return (
    <Card>
      <CardContent>
        {JSON.stringify(data, null, 2)}
      </CardContent>
    </Card>
  );
}