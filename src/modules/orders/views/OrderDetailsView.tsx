import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageLoader } from '../../../shared/components/PageLoader';
import { OrderProductsTable } from '../components/OrderProductsTable';
import { OrderStatusChip } from '../components/OrderStatusChip';
import { useOrderDetails } from '../orders.hooks';

export const OrderDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useOrderDetails({ id: Number(id) })
  
  if(loading) return <PageLoader message="Loading Order..." />;
  else if(!data) return <>Order Not found</>;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="h5">
              Order Details
            </Typography>
          </Grid>
          <Grid item>
            <OrderStatusChip status={data.status} />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Typography variant="subtitle1" color="primary" fontWeight={600}>
              Order Nro
            </Typography>
            <Typography>
              {data.id}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" color="primary" fontWeight={600}>
              Order Date
            </Typography>
            <Typography>
              {moment(data.orderDate).format('YYYY/MM/DD')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" color="primary" fontWeight={600}>
              Client
            </Typography>
            <Typography>
              {data.client?.name} {data.client?.lastname}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary" fontWeight={600}>
              Description
            </Typography>
            <Typography fontStyle="italic">
              {data.description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Typography variant="h6">
          Products List
        </Typography>
      </CardContent>
      <OrderProductsTable 
        data={data.orderProducts || []}
        total={data.total}
      />
    </Card>
  );
}