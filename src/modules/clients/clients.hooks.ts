import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "../../shared/components/SnackbarProvider";
import { fetchClientsListAction } from "./clients.actions";
import { ClientType } from "./clients.types";

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
  }
}