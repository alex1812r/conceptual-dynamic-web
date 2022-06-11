import React, { useCallback, useState } from 'react';
import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { Inventory as InventoryIcon } from '@mui/icons-material';
import { ProductsTable } from '../components/ProductsTable';
import { useCreateProduct, useDeleteProduct, useProductsList } from '../products.hooks';
import { ProductDialogForm } from '../components/ProductDialogForm';
import { useSnackbar } from '../../../shared/components/SnackbarProvider';
import { ProductType } from '../products.types';
import { DialogConfirm } from '../../../shared/components/DialogConfirm';

export const ProductsListView: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | undefined>();
  const [snackbar] = useSnackbar();
  const { data, refetch, loading } = useProductsList();

  const { submit: createProduct, submiting } = useCreateProduct({
    onSuccess: () => {
      setOpenDialog(false);
      snackbar({ color: 'success', message: 'added product successfully!' });
      refetch()
    },
    onError: (err) => {
      snackbar({ color: 'error', message: err.message })  
    }
  });

  const {
    submit: deleteProduct,
    submiting: deletingProduct  
  } = useDeleteProduct({
    onSuccess: () => {
      setOpenConfirmDialog(false);
      snackbar({ color: 'success', message: 'deleted product successfully!' });
      refetch()
    },
    onError: (err) => {
      snackbar({ color: 'error', message: err.message })  
    }
  });

  const onDeleteProduct = useCallback((product: ProductType) => {
    setSelectedProduct(product);
    setOpenConfirmDialog(true)
  }, [])

  const confirmDeleteProduct = useCallback(() => {
    if(selectedProduct && !deletingProduct) {
      deleteProduct(selectedProduct.id)
    }
  }, [deleteProduct, deletingProduct, selectedProduct]);

  const cancelDeleteProduct = useCallback(() => {
    setSelectedProduct(undefined);
    setOpenConfirmDialog(false);
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography display="inline-flex" variant="h5" style={{ alignItems: 'center' }}>
              <InventoryIcon fontSize="large" style={{ marginRight: 15 }} /> Products List
            </Typography>
            <Button onClick={() => setOpenDialog(true)}>
              Add Product
            </Button>
          </Stack>
        </CardContent>
        <Divider />
        <ProductsTable 
          data={data}
          loading={loading}
          onDelete={onDeleteProduct}
        />
        <ProductDialogForm 
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSubmit={createProduct}
          submiting={submiting}
        />
        <DialogConfirm 
          title="Delete Product"
          open={openConfirmDialog}
          onCancel={cancelDeleteProduct}
          onConfirm={confirmDeleteProduct}
          confirming={deletingProduct}
        >
          are you sure you want to delete this product?
        </DialogConfirm>
      </Card>
    </div>
  );
};