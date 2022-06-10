import React from 'react';
import { Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { PageLoader } from '../../../shared/components/PageLoader';
import { useClientDetails } from '../clients.hooks';

export const ClientDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useClientDetails({ id: Number(id) });

  if(loading) return <PageLoader message="Loading Client..." />;

  return (
    <Card>
      <CardContent>
        {JSON.stringify(data, null, 2)}
      </CardContent>
    </Card>
  );
};