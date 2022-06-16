import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "../../shared/components/SnackbarProvider";
import { fetchOrdersListAction, fetchOrderAction, createOrderAction, deleteOrderAction } from "./orders.actions";
import { OrderInputType, OrdersFilterType, OrderType } from "./orders.types";

export const useOrdersList = (filter: OrdersFilterType = {}) => {
  const [data, setData] = useState<Array<any>>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar] = useSnackbar();

  const { q, page, perPage } = filter;

  const getClientsList = useCallback(() => {
    setLoading(true);
    fetchOrdersListAction({ q, page, perPage })
      .then((data) => {
        setData(data.ordersList)
        setCount(data.count);
      })
      .catch((err: Error) => {
        snackbar({ color: 'error', message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page, perPage, q, snackbar]);

  useEffect(() => {
    getClientsList();
  }, [getClientsList]);

  return { 
    data, 
    refetch: getClientsList,
    loading,
    count
  };
}


export const useOrderDetails = ({ id }: { id: number }) => {
  const [data, setData] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar] = useSnackbar();

  const getOrder = useCallback(() => {
    setLoading(true);
    fetchOrderAction(id)
      .then((data) => {
        setData(data.order)
      })
      .catch((err: Error) => {
        snackbar({ color: 'error', message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id, snackbar]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return { 
    data, 
    refetch: getOrder,
    loading
  };
};

export const useCreateOrder = ({
  onSuccess,
  onError 
}: { 
  onSuccess: (data: OrderType) => void, 
  onError: (err: Error) => void 
}) => {
  const [submiting, setSubmiting] = useState(false);

  const createClient = useCallback((input: OrderInputType) => {
    setSubmiting(true);
    createOrderAction(input)
      .then((data) => {
        onSuccess(data.order)
      })
      .catch(onError)
      .finally(() => {
        setSubmiting(false);
      })
  }, [onError, onSuccess])

  return { submiting, submit: createClient }
};

export const useDeleteOrder = ({
  onSuccess,
  onError 
}: { 
  onSuccess: (val: boolean) => void, 
  onError: (err: Error) => void 
}) => {
  const [submiting, setSubmiting] = useState(false);

  const deleteOrder = useCallback((id: number) => {
    setSubmiting(true);
    deleteOrderAction(id)
      .then((data) => {
        onSuccess(data.success)
      })
      .catch(onError)
      .finally(() => {
        setSubmiting(false);
      })
  }, [onError, onSuccess])

  return { submiting, submit: deleteOrder }
}