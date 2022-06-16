import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useClientsList, useCreateClient, useDeleteClient, useUpdateClient } from "../clients.hooks";
import { ClientDialogForm } from "../components/ClientDialogForm";
import { DialogConfirm } from "../../../shared/components/DialogConfirm";
import { useSnackbar } from "../../../shared/components/SnackbarProvider";
import { ClientInputType, ClientType } from "../clients.types";
import { ClientsCrudTableCard } from "../components/ClientsCrudTableCard";
import { usePagination } from "../../../shared/hooks";

export const ClientsListView: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientType | undefined>();
  const [snackbar] = useSnackbar();
  const pagination = usePagination();
  const { data: clientsList, refetch, loading, count } = useClientsList({
    page: pagination.page,
    perPage: pagination.perPage,
  });

  useEffect(() => {
    pagination.setItemsCount(count);
  }, [count, pagination]);

  const { 
    submit: createClient, 
    submiting: creatingClient 
  } = useCreateClient({
    onSuccess: () => {
      setOpenDialog(false);
      snackbar({ color: 'success', message: 'added client successfully!' });
      refetch()
    },
    onError: (err) => {
      snackbar({ color: 'error', message: err.message })  
    }
  });

  const {
    submit: updateClient,
    submiting: updatingClient
  } = useUpdateClient({
    onSuccess: () => {
      setOpenDialog(false);
      snackbar({ color: 'success', message: 'updated client successfully!' });
      refetch()
    },
    onError: (err) => {
      snackbar({ color: 'error', message: err.message })  
    }
  });

  const {
    submit: deleteClient,
    submiting: deletingClient  
  } = useDeleteClient({
    onSuccess: () => {
      setOpenConfirmDialog(false);
      snackbar({ color: 'success', message: 'deleted client successfully!' });
      refetch()
    },
    onError: (err) => {
      snackbar({ color: 'error', message: err.message })  
    }
  });

  const submitingClient = useMemo(() => 
    updatingClient || creatingClient  
  , [creatingClient, updatingClient])

  const onSubmitClient = useCallback((input: ClientInputType) => {
    if(selectedClient) updateClient({
      id: selectedClient.id,
      ...input
    });
    else createClient(input)
  }, [createClient, selectedClient, updateClient])

  const onEditClient = useCallback((client: ClientType) => {
    setSelectedClient(client);
    setOpenDialog(true)
  }, [])

  const onDeleteClient = useCallback((client: ClientType) => {
    setSelectedClient(client);
    setOpenConfirmDialog(true)
  }, [])

  const confirmDeleteClient = useCallback(() => {
    if(selectedClient && !deletingClient) {
      deleteClient(selectedClient.id)
    }
  }, [deleteClient, deletingClient, selectedClient]);

  const cancelDeleteClient = useCallback(() => {
    setOpenConfirmDialog(false);
    setSelectedClient(undefined);
  }, []);
  
  const onCloseDialogForm = useCallback(() => {
    setOpenDialog(false);
    setSelectedClient(undefined);
  }, []);

  return (
    <>
      <ClientsCrudTableCard
         onAdd={() => setOpenDialog(true)}
         onDelete={onDeleteClient}
         onEdit={onEditClient}
         data={clientsList}
         loading={loading}
         pagination={pagination}
      />
      <ClientDialogForm
        open={openDialog}
        onClose={onCloseDialogForm}
        onSubmit={onSubmitClient}
        submiting={submitingClient}
        defaultValues={selectedClient}
        edit={Boolean(selectedClient)}
      />
      <DialogConfirm 
        title="Delete Client"
        open={openConfirmDialog}
        onCancel={cancelDeleteClient}
        onConfirm={confirmDeleteClient}
        confirming={deletingClient}
      >
        are you sure you want to delete this client?
      </DialogConfirm>
    </>
  );
}