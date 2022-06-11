import React, { useCallback, useState } from "react";
import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { Person as PersonIcon } from '@mui/icons-material';
import { useClientsList, useCreateClient, useDeleteClient } from "../clients.hooks";
import { ClientsTable } from "../components/ClientsTable";
import { ClientDialogForm } from "../components/ClientDialogForm";
import { DialogConfirm } from "../../../shared/components/DialogConfirm";
import { useSnackbar } from "../../../shared/components/SnackbarProvider";
import { ClientType } from "../clients.types";

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
    <div>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography display="inline-flex" variant="h5" style={{ alignItems: 'center' }}>
              <PersonIcon fontSize="large" style={{ marginRight: 15 }} /> Clients List
            </Typography>
            <Button onClick={() => setOpenDialog(true)}>
              Add Client
            </Button>
          </Stack>
        </CardContent>
        <Divider />
        <ClientsTable
          data={data} 
          loading={loading} 
          onDelete={onDeleteClient}  
        />
      </Card>
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
    </div>
  );
}