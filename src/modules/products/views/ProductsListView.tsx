import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCreateProduct, useDeleteProduct, useProductsList, useUpdateProduct } from '../products.hooks';
import { ProductDialogForm } from '../components/ProductDialogForm';
import { useSnackbar } from '../../../shared/components/SnackbarProvider';
import { ProductInputType, ProductType, UpdateProductInputType } from '../products.types';
import { DialogConfirm } from '../../../shared/components/DialogConfirm';
import { ProductsCrudTableCard } from '../components/ProductsCrudTableCard';
import { usePagination } from '../../../shared/hooks';

export const ProductsListView: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | undefined>();
  const [snackbar] = useSnackbar();
  const pagination = usePagination();

  const { data, refetch, loading, count } = useProductsList({
    page: pagination.page,
    perPage: pagination.perPage
  });

  useEffect(() => {
    pagination.setItemsCount(count);
  }, [count, pagination]);

  const { submit: createProduct, submiting: creatingProduct } = useCreateProduct({
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
    submit: updateProduct,
    submiting: updatingProduct  
  } = useUpdateProduct({
    onSuccess: () => {
      setOpenDialog(false);
      snackbar({ color: 'success', message: 'updated product successfully!' });
      refetch()
    },
    onError: (err) => {
      snackbar({ color: 'error', message: err.message })  
    }
  });

  const submitingProduct = useMemo(() => 
  updatingProduct || creatingProduct
, [creatingProduct, updatingProduct])

  const onSubmitProduct = useCallback((input: ProductInputType) => {
    if(selectedProduct) {
      const { image: inputImage, ...restInput } = input;
      const updateData: UpdateProductInputType = {
        id: selectedProduct.id,
        ...restInput
      }
      if(inputImage && inputImage.fileId !== selectedProduct.image?.fileId) {
        updateData.updateImage = inputImage;
      }
      updateProduct(updateData);
    }
    else createProduct(input)
  }, [createProduct, selectedProduct, updateProduct])

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

  const onEditProduct = useCallback((product: ProductType) => {
    setSelectedProduct(product);
    setOpenDialog(true)
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

  const onCloseDialogForm = useCallback(() => {
    setOpenDialog(false);
    setSelectedProduct(undefined);
  }, []);

  return (
    <>
    <ProductsCrudTableCard 
      onAdd={() => setOpenDialog(true)}
      onDelete={onDeleteProduct}
      onEdit={onEditProduct}
      data={data}
      loading={loading}
      pagination={pagination}
    />
    <ProductDialogForm
      open={openDialog}
      onClose={onCloseDialogForm}
      onSubmit={onSubmitProduct}
      submiting={submitingProduct}
      defaultValues={selectedProduct}
      edit={Boolean(selectedProduct)}
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