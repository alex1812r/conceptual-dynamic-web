import React, { useCallback, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { TableRowEmpty } from "./TableRowEmpty";
import { TableRowLoading } from "./TableRowLoading";
import { ActionsMenuIconButton } from "./ActionsMenuIconButton";

export interface CrudProps<T> {
  onRead: (v: T) => void;
  onDelete: (v: T) => void;
  onEdit: (v: T) => void;
}

type ColumnType = {
  align?: string;
  colsPan?: number;
  title: string;
  field: string;
  render?: (v: any) => React.ReactNode;
}

interface TableRowItemProps extends CrudProps<any> {
  item: any;
  fields: Array<Omit<ColumnType, 'title'>>
}
const TableRowItem: React.FC<TableRowItemProps> = ({ 
  item,
  fields,
  onRead,
  onDelete,
  onEdit,
}) => {
  const [openActionsMenu, setOpenActionsMenu] = useState(false);

  const handleOnDelete = useCallback(() => {
    setOpenActionsMenu(false);
    onDelete(item)
  }, [item, onDelete])

  const handleOnRead = useCallback(() => {
    setOpenActionsMenu(false);
    onRead(item)
  }, [item, onRead])
  
  const handleOnEdit = useCallback(() => {
    setOpenActionsMenu(false);
    onEdit(item)
  }, [item, onEdit])

  const actions = useMemo(() =>
    [
      { value: 'Details', onClick: handleOnRead },
      { value: 'Edit', onClick: handleOnEdit },
      { value: 'Delete', onClick: handleOnDelete },
    ]
  , [handleOnDelete, handleOnEdit, handleOnRead])

  const fieldsComponent = useMemo(() => 
    fields.map(({ field, render }, i) => 
      <TableCell key={`item-${i+1}`}>
        {render ? render(item) : item[field]}
      </TableCell>
    )
  , [fields, item]);

  return (
    <TableRow>
      {fieldsComponent}
      <TableCell>
        <ActionsMenuIconButton
          open={openActionsMenu}
          toggleMenu={(val) => setOpenActionsMenu(val)}
          actions={actions}
        />
      </TableCell>
    </TableRow>
  )
}


export interface CustomTableProps extends CrudProps<any> {
  columns: Array<ColumnType>
  data: Array<any>
  loading?: boolean;
  loaderMessage?: string 
}

export const CustomTable: React.FC<CustomTableProps> = ({ 
  columns,
  loading,
  data,
  onDelete,
  onEdit,
  onRead,
  loaderMessage
}) => {

  const headers = useMemo(() => {
    return columns.map((column) => (
      <TableCell>{column.title}</TableCell>
    ));
  }, [columns])

  const content = useMemo(() => {
    if(loading) 
      return <TableRowLoading colSpan={columns.length + 1} message={loaderMessage} />;

    if(!data.length)
      return <TableRowEmpty colSpan={columns.length + 1} />

    return data.map((item, i) => (
      <TableRowItem
        key={`item-${i+1}`}
        item={item}
        fields={columns} 
        onRead={onRead}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))
  }, [columns, data, loaderMessage, loading, onDelete, onEdit, onRead])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers}
            <TableCell>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content}
        </TableBody>
      </Table>
    </TableContainer>
  )
}