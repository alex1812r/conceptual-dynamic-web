import React, { useCallback, useState } from 'react';
import { useCreateProduct, useDeleteProduct, useProductsList } from '../products.hooks';
import { ProductDialogForm } from '../components/ProductDialogForm';
import { useSnackbar } from '../../../shared/components/SnackbarProvider';
import { ProductType } from '../products.types';
import { DialogConfirm } from '../../../shared/components/DialogConfirm';
import { ProductsCrudTableCard } from '../components/ProductsCrudTableCard';

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
    <>
    <ProductsCrudTableCard 
      onAdd={() => setOpenDialog(true)}
      onDelete={onDeleteProduct}
      onEdit={() => {}}
      data={data}
      loading={loading}
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
    </>
  );
};