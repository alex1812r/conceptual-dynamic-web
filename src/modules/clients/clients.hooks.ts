import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "../../shared/components/SnackbarProvider";
import { createClientAction, fetchClientAction, fetchClientsListAction } from "./clients.actions";
import { ClientInputType, ClientType } from "./clients.types";

export const useClientsList = () => {
  const [data, setData] = useState<Array<ClientType>>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar] = useSnackbar();

  const getClientsList = useCallback(() => {
    setLoading(true);
    fetchClientsListAction()
      .then((data) => {
        setData(data.clientsList)
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


export const useClientDetails = ({ id }: { id: number }) => {
  const [data, setData] = useState<ClientType | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar] = useSnackbar();

  const getClient = useCallback(() => {
    fetchClientAction(id)
      .then((data) => {
        setData(data.client)
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

export const useCreateClient = ({
  onSuccess,
  onError 
}: { 
  onSuccess: (data: ClientType) => void, 
  onError: (err: Error) => void 
}) => {
  const [submiting, setSubmiting] = useState(false);

  const createClient = useCallback((input: ClientInputType) => {
    setSubmiting(true);
    createClientAction(input)
      .then((data) => {
        onSuccess(data.client)
      })
      .catch(onError)
      .finally(() => {
        setSubmiting(false);
      })
  }, [onError, onSuccess])

  return { submiting, submit: createClient }
};