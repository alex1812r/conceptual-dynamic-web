import React, { useCallback, useState } from "react";
import { useClientsList, useCreateClient, useDeleteClient } from "../clients.hooks";
import { ClientDialogForm } from "../components/ClientDialogForm";
import { DialogConfirm } from "../../../shared/components/DialogConfirm";
import { useSnackbar } from "../../../shared/components/SnackbarProvider";
import { ClientType } from "../clients.types";
import { ClientsCrudTableCard } from "../components/ClientsCrudTableCard";

export const ClientsListView: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientType | undefined>();
  const [snackbar] = useSnackbar()
  const { data, refetch, loading } = useClientsList();

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
    setSelectedClient(undefined);
    setOpenConfirmDialog(false);
  }, []);

  return (
    <>
      <ClientsCrudTableCard 
         onAdd={() => setOpenDialog(true)}
         onDelete={onDeleteClient}
         onEdit={() => {}}
         data={data}
         loading={loading}
      />
      <ClientDialogForm 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={createClient}
        submiting={creatingClient}
        defaultValues={selectedClient}
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