import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteChangeReason, AutocompleteRenderInputParams } from '@mui/material';
import { useProductsList } from '../../modules/products/products.hooks';
import { ProductType } from '../../modules/products/products.types';

export interface SearchProductInputProps {
  renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onChange: (
    value: ProductType | null,
    reason: AutocompleteChangeReason
  ) => void;
  defaultValue?: ProductType | null;
}
export const SearchProductField: React.FC<SearchProductInputProps> = ({ renderInput, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const { data, loading, refetch } = useProductsList({ q: inputValue });

  useEffect(() => {
    if(open) {
      refetch()
    }
  }, [open, refetch])

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={data}
      renderInput={renderInput}
      getOptionLabel={(op) => op.name} 
      loading={loading}
      onInput={(e: any) => setInputValue(e.target.value)}
      onChange={(_e, value, reason) => onChange(value, reason)}
    />
  )
}