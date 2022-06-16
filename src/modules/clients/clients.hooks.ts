import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "../../shared/components/SnackbarProvider";
import { createClientAction, deleteClientAction, fetchClientAction, fetchClientsListAction, updateClientAction } from "./clients.actions";
import { ClientInputType, ClientType, ClientListFilterType, UpdateClientInputType } from "./clients.types";

export const useClientsList = (filter: ClientListFilterType = {}) => {
  const [data, setData] = useState<Array<ClientType>>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar] = useSnackbar();

  const { q, page, perPage } = filter;

  const getClientsList = useCallback(() => {
    setLoading(true);
    fetchClientsListAction({ q, page, perPage })
      .then((data) => {
        setData(data.clientsList)
        setCount(data.count);
      })
      .catch((err: Error) => {
        snackbar({ color: 'error', message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [q, page, perPage, snackbar]);

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


export const useClientDetails = ({ id }: { id: number }) => {
  const [data, setData] = useState<ClientType | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar] = useSnackbar();

  const getClient = useCallback(() => {
    setLoading(true);
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

export const useUpdateClient = ({
  onSuccess,
  onError 
}: { 
  onSuccess: (data: ClientType) => void, 
  onError: (err: Error) => void 
}) => {
  const [submiting, setSubmiting] = useState(false);

  const updateClient = useCallback((input: UpdateClientInputType) => {
    setSubmiting(true);
    updateClientAction(input)
      .then((data) => {
        onSuccess(data.client)
      })
      .catch(onError)
      .finally(() => {
        setSubmiting(false);
      })
  }, [onError, onSuccess])

  return { submiting, submit: updateClient }
}

export const useDeleteClient = ({
  onSuccess,
  onError 
}: { 
  onSuccess: (val: boolean) => void, 
  onError: (err: Error) => void 
}) => {
  const [submiting, setSubmiting] = useState(false);

  const deleteClient = useCallback((id: number) => {
    setSubmiting(true);
    deleteClientAction(id)
      .then((data) => {
        onSuccess(data.success)
      })
      .catch(onError)
      .finally(() => {
        setSubmiting(false);
      })
  }, [onError, onSuccess])

  return { submiting, submit: deleteClient }
}