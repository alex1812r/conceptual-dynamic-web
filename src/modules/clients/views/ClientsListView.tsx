import React, { useState } from "react";
import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { Person as PersonIcon } from '@mui/icons-material';
import { useClientsList, useCreateClient } from "../clients.hooks";
import { ClientsTable } from "../components/ClientsTable";
import { ClientDialogForm } from "../components/ClientDialogForm";
import { DialogConfirm } from "../../../shared/components/DialogConfirm";
import { useSnackbar } from "../../../shared/components/SnackbarProvider";

export const ClientsListView: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [snackbar] = useSnackbar()
  const { data, refetch, loading } = useClientsList();
  const { 
    submit: createClient, 
    submiting 
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
          onDelete={() => setOpenConfirmDialog(true)}  
        />
      </Card>
      <ClientDialogForm 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={createClient}
        submiting={submiting}
      />
      <DialogConfirm 
        title="Delete Client"
        open={openConfirmDialog}
        onCancel={() => setOpenConfirmDialog(false)}
        onConfirm={() => console.log('confirm')}
      >
        are you sure you want to delete client?
      </DialogConfirm>
    </div>
  );
}