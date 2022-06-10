import React, { useEffect, useMemo } from 'react';
import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogForm } from '../../../shared/components/DialogForm';
import { initialProductInput } from '../products.models';
import { productSchema } from '../products.validators';
import { ProductInputType } from '../products.types';

export interface ProductDialogFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductInputType) => void
  submiting?: boolean;
  defaultValues?: ProductInputType
}

export const ProductDialogForm: React.FC<ProductDialogFormProps> = ({
  onSubmit,
  defaultValues: auxDefaultValues,
  submiting,
  onClose,
  open
}) => {

  const defaultValues = useMemo(() => {
    return auxDefaultValues || initialProductInput
  }, [auxDefaultValues])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ 
    defaultValues,
    resolver: yupResolver(productSchema)
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
      title="Create Product"
      onSubmit={handleSubmit(onSubmit)}
      disabledSubmit={disabledSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
            label="Unit Price"
            error={Boolean(errors.unitPrice?.message)}
            helperText={errors.unitPrice?.message}
            inputProps={{
              ...register('unitPrice')
            }}
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
            label="Count"
            error={Boolean(errors.count?.message)}
            helperText={errors.count?.message}
            inputProps={{
              ...register('count')
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Image URL"
            error={Boolean(errors.imgUrl?.message)}
            helperText={errors.imgUrl?.message}
            inputProps={{
              ...register('imgUrl')
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="description"
            multiline
            rows={5}
            error={Boolean(errors.description?.message)}
            helperText={errors.description?.message}
            inputProps={{
              ...register('description')
            }}
          />
        </Grid>
      </Grid>
    </DialogForm>
  )
};