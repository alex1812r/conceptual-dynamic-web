import React, { useEffect, useMemo } from 'react';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  AddCircleOutline as AddIcon, 
  RemoveCircleOutline as RemoveIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { DialogForm } from '../../../shared/components/DialogForm';
import { OrderInputType } from '../orders.types';
import { initialOrderInput } from '../orders.models';
import { orderSchema } from '../orders.validators';
import { SearchClientField } from '../../../shared/components/SearchClientField';
import { SearchProductField } from '../../../shared/components/SearchProductsField';

export interface OrderDialogFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: OrderInputType) => void
  submiting?: boolean;
  defaultValues?: OrderInputType
}

export const OrderDialogForm: React.FC<OrderDialogFormProps> = ({
  onSubmit,
  defaultValues: auxDefaultValues,
  submiting,
  onClose,
  open
}) => {

  const defaultValues = useMemo(() => {
    return auxDefaultValues || {...initialOrderInput}
  }, [auxDefaultValues])

  const { 
    register, 
    handleSubmit, 
    reset,
    control,
    formState: { errors }
  } = useForm({ 
    defaultValues,
    resolver: yupResolver(orderSchema)
  });
  const { 
    fields,
    append,
    remove,
  } = useFieldArray({ control, name: 'orderProducts' })

  const disabledSubmit = useMemo(() => {
    const { orderProducts: orderProductsErrors, ...restErrors } = errors;
    return Boolean(submiting || Object.keys(restErrors).length || orderProductsErrors?.length) 
  }, [errors, submiting]);

  useEffect(() => {
    if(!open) {
      reset({...defaultValues})
    }
  }, [open, defaultValues, reset])

  const productsComponent = useMemo(() => 
    fields.map((field, index) => {
      const fieldError = errors.orderProducts ? errors.orderProducts[index] : undefined
      return (
        <>
          <Grid key={field.id} item xs={12} md={8}>
            {index !== 0 
              ? (
                <IconButton 
                  onClick={() => remove(index)}
                  size="small" 
                  style={{ position: 'absolute', left: -3 }}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
              )
              : null
            }
            <Controller
              control={control}
              name={`orderProducts.${index}.productId`}
              render={({ field: { onChange } }) => {
                return (
                  <SearchProductField
                    onChange={(v) => onChange(v?.id || 0)}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label="Product"
                          InputProps={{
                            ...params.InputProps,
                          }}
                          error={Boolean(fieldError?.productId)}
                          helperText={fieldError?.productId?.message}
                        />
                      )
                    }}
                  />

                )
              }}
            />
          </Grid>
          <Grid key={field.id} item xs={12} md={4}>
            <TextField 
              label="Count"
              type="number"
              error={Boolean(fieldError?.count)}
              helperText={fieldError?.count?.message}
              inputProps={{
                ...register(`orderProducts.${index}.count`)
              }}
            />
          </Grid>
        </>
      );
    }
    ), [control, errors.orderProducts, fields, register, remove])

  return (
    <DialogForm
      open={open}
      onClose={onClose}
      title="Add Order"
      onSubmit={handleSubmit(onSubmit)}
      disabledSubmit={disabledSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Controller
            control={control}
            name="clientId"
            render={({ field: { onChange } }) => {
              return (
                <SearchClientField
                  onChange={(v) => onChange(v?.id || 0)}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label="Client"
                        InputProps={{
                          ...params.InputProps
                        }}
                        error={Boolean(errors.clientId)}
                        helperText={errors.clientId?.message}
                      />
                    )
                  }}
                />
              )
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            control={control}
            name="orderDate"
            render={({ field: { value, onChange } }) => {
              return (
                <DatePicker
                  label="Order Date"
                  inputFormat="YYYY/MM/DD"
                  value={moment(value)}
                  onChange={(newMoment) => {
                    if(newMoment) onChange(newMoment.format('YYYY/MM/DD'))
                    else onChange('') 
                  }}
                  renderInput={(params) => 
                    <TextField 
                      {...params}
                      error={Boolean(errors.orderDate)}
                      helperText={errors.orderDate?.message}
                    />
                  }
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Products List
          </Typography>
        </Grid>
        {productsComponent}
        <Grid item xs={12}>
          <IconButton 
            color="primary" 
            onClick={() => append({ productId: 0, count: 0 })}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </DialogForm>
  )
};