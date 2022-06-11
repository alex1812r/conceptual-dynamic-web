import React, { useState } from 'react';
import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { ShoppingBag as ShoppingIcon } from '@mui/icons-material';
import { OrdersTable } from '../components/OrdersTable';
import { useCreateOrder, useOrdersList } from '../orders.hooks';
import { OrderDialogForm } from '../components/OrderDialogForm';
import { useSnackbar } from '../../../shared/components/SnackbarProvider';

export const OrdersListView: React.FC = () => {
  const { data, loading, refetch } = useOrdersList();
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar] = useSnackbar();

  const { submit, submiting } = useCreateOrder({
    onSuccess: () => {
      setOpenDialog(false);
      snackbar({ color: 'success', message: 'added order successfully!' });
      refetch() 
    },
    onError: (err) => {
      snackbar({ color: 'error', message: err.message })  
    }
  })
  
  return (
    <>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography display="inline-flex" variant="h5" style={{ alignItems: 'center' }}>
              <ShoppingIcon fontSize="large" style={{ marginRight: 15 }} /> Orders List
            </Typography>
            <Button onClick={() => setOpenDialog(true)}>
              Add Order
            </Button>
          </Stack>
        </CardContent>
        <Divider />
        <OrdersTable 
          data={data}
          onDelete={() => {}}
          loading={loading}
        />
        <OrderDialogForm 
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSubmit={submit}
          submiting={submiting}
        />
      </Card>
    </>
  )
};