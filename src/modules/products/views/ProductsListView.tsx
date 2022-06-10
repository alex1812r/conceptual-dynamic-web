import React, { useState } from 'react';
import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { ProductsTable } from '../components/ProductsTable';
import { useCreateProduct, useProductsList } from '../products.hooks';
import { ProductDialogForm } from '../components/ProductDialogForm';
import { useSnackbar } from '../../../shared/components/SnackbarProvider';

export const ProductsListView: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar] = useSnackbar();
  const { data, refetch, loading } = useProductsList();

  const { submit: createProduct, submiting } = useCreateProduct({
    onSuccess: () => {
      setOpenDialog(false);
      snackbar({ color: 'success', message: 'created client successfully!' });
      refetch()
    },
    onError: (err) => {
      snackbar({ color: 'error', message: err.message })  
    }
  });
  
  return (
    <div>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="h5">Products List</Typography>
            <Button onClick={() => setOpenDialog(true)}>
              Add Product
            </Button>
          </Stack>
        </CardContent>
        <Divider />
        <ProductsTable 
          data={data}
          loading={loading}
          onDelete={() => {}}
        />
        <ProductDialogForm 
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSubmit={createProduct}
          submiting={submiting}
        />
      </Card>
    </div>
  );
};