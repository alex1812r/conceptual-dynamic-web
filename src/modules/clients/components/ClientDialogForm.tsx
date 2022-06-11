import React, { useEffect, useMemo } from 'react';
import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogForm } from '../../../shared/components/DialogForm';
import { initialClientInput } from '../clients.models';
import { ClientInputType } from '../clients.types';
import { clientSchema } from '../clients.validators';

export interface ClientDialogFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ClientInputType) => void
  submiting?: boolean;
  defaultValues?: ClientInputType
}

export const ClientDialogForm: React.FC<ClientDialogFormProps> = ({
  onSubmit,
  defaultValues: auxDefaultValues,
  submiting,
  onClose,
  open
}) => {

  const defaultValues = useMemo(() => {
    return auxDefaultValues || initialClientInput
  }, [auxDefaultValues])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ 
    defaultValues,
    resolver: yupResolver(clientSchema)
  })

  const disabledSubmit = useMemo(() => {
    return Boolean(submiting || Object.keys(errors).length) 
  }, [errors, submiting]);

  useEffect(() => {
    if(!open) {
      reset({...defaultValues})
    }
  }, [open, defaultValues, reset])

  return (
    <DialogForm
      open={open}
      onClose={onClose}
      title="Add Client"
      onSubmit={handleSubmit(onSubmit)}
      disabledSubmit={disabledSubmit}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <TextField 
            label="Name"
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            inputProps={{
              ...register('name')
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
            label="Lastname"
            error={Boolean(errors.lastname?.message)}
            helperText={errors.lastname?.message}
            inputProps={{
              ...register('lastname')
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
            label="CI"
            error={Boolean(errors.dni?.message)}
            helperText={errors.dni?.message}
            inputProps={{
              ...register('dni')
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
            label="Date of Birth"
            error={Boolean(errors.dateOfBirth?.message)}
            helperText={errors.dateOfBirth?.message}
            inputProps={{
              ...register('dateOfBirth')
            }}
          />
        </Grid>
        <Grid item md={7}>
          <TextField 
            label="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            inputProps={{
              ...register('email')
            }}
          />
        </Grid>
        <Grid item md={5}>
          <TextField 
            label="phone"
            error={Boolean(errors.phone?.message)}
            helperText={errors.phone?.message}
            inputProps={{
              ...register('phone')
            }}
          />
        </Grid>
      </Grid>
    </DialogForm>
  )
};