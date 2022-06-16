import React, { useCallback, useEffect, useState } from 'react';
import { useCreateOrder, useDeleteOrder, useOrdersList } from '../orders.hooks';
import { OrderDialogForm } from '../components/OrderDialogForm';
import { useSnackbar } from '../../../shared/components/SnackbarProvider';
import { OrderType } from '../orders.types';
import { DialogConfirm } from '../../../shared/components/DialogConfirm';
import { OrdersCrudTableCard } from '../components/OrdersCrudTableCard';
import { usePagination } from '../../../shared/hooks';

export const OrdersListView: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | undefined>();
  const pagination = usePagination();
  const { data, loading, refetch, count } = useOrdersList({
    page: pagination.page,
    perPage: pagination.perPage
  });
  const [snackbar] = useSnackbar();

  useEffect(() => {
    pagination.setItemsCount(count);
  }, [count, pagination]);

  const { submit, submiting } = useCreateOrder({
    onSuccess: () => {
      setOpenDialog(false);
      snackbar({ color: 'success', message: 'added order successfully!' });
      refetch() 
    },
    onError: (err) => {
      snackbar({ color: 'error', message: err.message })  
    }
  });

  const {
    submit: deleteOrder,
    submiting: deletingOrder
  } = useDeleteOrder({
    onSuccess: () => {
      setOpenConfirmDialog(false);
      snackbar({ color: 'success', message: 'deleted order successfully!' });
      refetch()
    },
    onError: (err) => {
      snackbar({ color: 'error', message: err.message })  
    }
  });

  const onDeleteOrder = useCallback((order: OrderType) => {
    setSelectedOrder(order);
    setOpenConfirmDialog(true)
  }, [])

  const confirmDeleteOrder = useCallback(() => {
    if(selectedOrder && !deletingOrder) {
      deleteOrder(selectedOrder.id)
    }
  }, [deleteOrder, deletingOrder, selectedOrder]);

  const cancelDeleteOrder = useCallback(() => {
    setSelectedOrder(undefined);
    setOpenConfirmDialog(false);
  }, []);
  
  return (
    <>
      <OrdersCrudTableCard 
        onAdd={() => setOpenDialog(true)}
        onDelete={onDeleteOrder}
        onEdit={() => {}}
        data={data}
        loading={loading}
        pagination={pagination}
      />
      <OrderDialogForm 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={submit}
        submiting={submiting}
      />
      <DialogConfirm 
        title="Delete Order"
        open={openConfirmDialog}
        onCancel={cancelDeleteOrder}
        onConfirm={confirmDeleteOrder}
        confirming={deletingOrder}
      >
        are you sure you want to delete this Order?
      </DialogConfirm>
    </>
  )
};