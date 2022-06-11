import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "../../shared/components/SnackbarProvider";
import { fetchOrdersListAction, fetchOrderAction, createOrderAction } from "./orders.actions";
import { OrderInputType, OrderType } from "./orders.types";

export const useOrdersList = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar] = useSnackbar();

  const getClientsList = useCallback(() => {
    setLoading(true);
    fetchOrdersListAction()
      .then((data) => {
        setData(data.ordersList)
      })
      .catch((err: Error) => {
        snackbar({ color: 'error', message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [snackbar]);

  useEffect(() => {
    getClientsList();
  }, [getClientsList]);

  return { 
    data, 
    refetch: getClientsList,
    loading
  };
}


export const useOrderDetails = ({ id }: { id: number }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar] = useSnackbar();

  const getClient = useCallback(() => {
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
    getClient();
  }, [getClient]);

  return { 
    data, 
    refetch: getClient,
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