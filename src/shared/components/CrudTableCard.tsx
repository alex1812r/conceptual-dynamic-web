import React, { useMemo } from 'react';
import { Button, Card, CardContent, Divider, Pagination, Stack, Typography, Box } from '@mui/material';
import { CustomTable, CustomTableProps } from './CrudTable';
import { PaginationType } from '../hooks';

export interface CrudTableCardProps extends CustomTableProps {
  title: string;
  icon?: React.ReactNode;
  addButtonText?: string;
  onAdd: () => void;
  pagination?: PaginationType
  loaderMessage?: string;
}

export const CrudTableCard: React.FC<CrudTableCardProps> = ({
  title,
  icon,
  addButtonText,
  onAdd,
  data,
  columns,
  loading,
  onDelete,
  onEdit,
  onRead,
  pagination,
  loaderMessage
}) => {

  const paginationContent = useMemo(() => {
    if(!pagination) return null;
    
    return (
      <CardContent>
        <Stack flexDirection="row" justifyContent="center">
          <Pagination 
            page={pagination.page}
            count={pagination.totalPages}
            onChange={(_e, page) => pagination.setPage(page)}
            showFirstButton
            showLastButton
            color="primary"
          />
        </Stack>
      </CardContent>
    )
  }, [pagination])

  return (
    <Card 
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column'
      }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Typography display="inline-flex" variant="h5" style={{ alignItems: 'center' }}>
            {icon 
              ? (
                <Box component="span" marginRight={2}>
                  {icon}
                </Box>
              )
              : null}
              {title}
          </Typography>
          <Button onClick={onAdd}>
            {addButtonText}
          </Button>
        </Stack>
      </CardContent>
      <Divider />
      <Box flexGrow={1}>
        <CustomTable 
          data={data}
          columns={columns}
          loading={loading}
          onDelete={onDelete}
          onEdit={onEdit}
          onRead={onRead}
          loaderMessage={loaderMessage}
        />
      </Box>
      {paginationContent}
    </Card>
  )
}

CrudTableCard.defaultProps = {
  title: 'Table CRUD',
  addButtonText: 'Add'
}