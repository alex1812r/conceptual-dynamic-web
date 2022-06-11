import React, { useEffect, useMemo } from 'react';
import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
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
    return auxDefaultValues || {...initialClientInput}
  }, [auxDefaultValues])

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({ 
    defaultValues,
    resolver: yupResolver(clientSchema)
  })

  const disabledSubmit = useMemo(() => {
    return Boolean(submiting || Object.entries(errors).length > 0) 
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
        <Grid item xs={12} md={6}>
          <TextField 
            label="Name"
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            inputProps={{
              ...register('name')
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
            label="Lastname"
            error={Boolean(errors.lastname?.message)}
            helperText={errors.lastname?.message}
            inputProps={{
              ...register('lastname')
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="CI"
            error={Boolean(errors.dni?.message)}
            helperText={errors.dni?.message}
            inputProps={{
              ...register('dni')
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { value, onChange } }) => {
              return (
                <DatePicker
                  label="Date of Birth"
                  inputFormat="YYYY/MM/DD"
                  value={moment(value)}
                  onChange={(newMoment) => {
                    if(newMoment) onChange(newMoment.format('YYYY/MM/DD'))
                    else onChange('') 
                  }}
                  renderInput={(params) => 
                    <TextField 
                      {...params}
                      error={Boolean(errors.dateOfBirth)}
                      helperText={errors.dateOfBirth?.message}
                    />
                  }
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField 
            label="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            inputProps={{
              ...register('email')
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
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