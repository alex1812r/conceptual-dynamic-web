import React, { useEffect, useMemo } from 'react';
import { Avatar, Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogForm } from '../../../shared/components/DialogForm';
import { initialProductInput } from '../products.models';
import { productSchema } from '../products.validators';
import { ProductInputType } from '../products.types';
import { useFilestack } from '../../../shared/hooks';

export interface ProductDialogFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductInputType) => void
  submiting?: boolean;
  defaultValues?: ProductInputType
  edit?: boolean
}

export const ProductDialogForm: React.FC<ProductDialogFormProps> = ({
  onSubmit,
  defaultValues: auxDefaultValues,
  submiting,
  onClose,
  open,
  edit
}) => {
  const { pick: pickImg } = useFilestack({ accept: 'image/*' })

  const defaultValues = useMemo(() => {
    return auxDefaultValues || initialProductInput
  }, [auxDefaultValues])

  const { 
    register, 
    handleSubmit, 
    reset,
    watch,
    formState: { errors }, 
    setValue 
  } = useForm({ 
    defaultValues,
    resolver: yupResolver(productSchema)
  })

  const disabledSubmit = Boolean(submiting || Object.keys(errors).length) 

  const title = useMemo(() =>
    edit ? 'Edit Product' : 'Add Product'
  , [edit]);

  const submitText = useMemo(() =>
    edit ? 'Save' : 'Add'
  , [edit]);

  useEffect(() => {
    if(open) {
      reset({...defaultValues})
    }
  }, [open, defaultValues, reset])

  return (
    <DialogForm
      open={open}
      onClose={onClose}
      title={title}
      onSubmit={handleSubmit(onSubmit)}
      buttonSubmitText={submitText}
      disabledSubmit={disabledSubmit}
      submiting={submiting}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} alignItems="center">
            <Box>
              <Avatar
                src={watch('image.url')}
                variant="square"
                style={{ width: 180, height: 180 }}
              />
            </Box>
            <Box> 
              <Button onClick={() => 
                pickImg((files) => {
                  const { handle: fileId, filename, url } = files[0];
                  const image = {
                    fileId,
                    filename,
                    url,
                  };
                  setValue('image', image);
                }
              )}>
                Pick Image
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
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
            <Grid item xs={12} md={6}>
              <TextField 
                label="Unit Price"
                error={Boolean(errors.unitPrice?.message)}
                helperText={errors.unitPrice?.message}
                inputProps={{
                  ...register('unitPrice')
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
    </DialogForm>
  )
};