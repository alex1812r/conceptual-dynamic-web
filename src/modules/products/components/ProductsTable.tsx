import React, { useCallback, useMemo, useState } from "react";
import { Avatar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ActionsMenuIconButton } from "../../../shared/components/ActionsMenuIconButton";
import { TableRowEmpty } from "../../../shared/components/TableRowEmpty";
import { TableRowLoading } from "../../../shared/components/TableRowLoading";
import { numberWithCommas } from "../../../shared/utils";
import { ProductType } from "../products.types";
import { ProductStatusChip } from "./ProductStatusChip";

interface TableRowItemProps {
  data: ProductType
  onDelete: (id: number) => void;
}
const TableRowItem: React.FC<TableRowItemProps> = ({ data, onDelete }) => {
  const [openActionsMenu, setOpenActionsMenu] = useState(false);
  const navigate = useNavigate();
  
  const handleOnDelete = useCallback(() => {
    onDelete(data.id)
    setOpenActionsMenu(false)
  }, [data.id, onDelete])

  const handleOnDetails = useCallback(() => {
    navigate(`/products/${data.id}`)
    setOpenActionsMenu(false)
  }, [data.id, navigate])

  const actions = useMemo(() => 
    [
      { value: 'Details', onClick: handleOnDetails },
      { value: 'Edit', onClick: () => console.log('Edit') },
      { value: 'Delete', onClick: handleOnDelete },
    ]
  , [handleOnDelete, handleOnDetails]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Stack spacing={2} flexDirection="row" alignItems="center">
          {data.imgUrl ? <Avatar src={data.imgUrl}  variant="square" /> : null}
          {data.name}
        </Stack>
      </TableCell>
      <TableCell>
        {numberWithCommas(data.unitPrice)}
      </TableCell>  
      <TableCell>
        <ProductStatusChip status={data.status} />
      </TableCell>
      <TableCell>
        {data.count}
      </TableCell>
      <TableCell>
        <ActionsMenuIconButton
          open={openActionsMenu}
          toggleMenu={(val) => setOpenActionsMenu(val)}
          actions={actions}
        />
      </TableCell>
    </TableRow>
  );
};

export interface ProductsTableProps extends Omit<TableRowItemProps, 'data'> {
  data: Array<ProductType>;
  loading?: boolean;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ 
  data, 
  loading,
  onDelete
}) => {

  const content = useMemo(() => {
    if(loading) 
      return <TableRowLoading colSpan={5} message="Loading Products..." />;

    if(!data.length)
      return <TableRowEmpty colSpan={5} />
      
    return data.map((item) => <TableRowItem key={item.id} data={item} onDelete={onDelete} />)
    
  }
  , [data, loading, onDelete]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content}
        </TableBody>
      </Table>
    </TableContainer>
  )
};