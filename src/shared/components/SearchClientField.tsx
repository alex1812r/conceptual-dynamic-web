import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteChangeReason, AutocompleteRenderInputParams } from '@mui/material';
import { useClientsList } from '../../modules/clients/clients.hooks';
import { ClientType } from '../../modules/clients/clients.types';

export interface SearchClientInputProps {
  renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onChange: (
    value: ClientType | null,
    reason: AutocompleteChangeReason
  ) => void;
  defaultValue?: ClientType | null
}
export const SearchClientField: React.FC<SearchClientInputProps> = ({ 
  renderInput, 
  onChange, 
  defaultValue 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const { data, loading, refetch } = useClientsList({ q: inputValue });

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
      getOptionLabel={(op) => `${op.name} ${op.lastname}`} 
      loading={loading}
      onInput={(e: any) => setInputValue(e.target.value)}
      onChange={(_e, value, reason) => onChange(value, reason)}
      defaultValue={defaultValue}
    />
  )
}