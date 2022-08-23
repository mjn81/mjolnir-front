import React from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

type Props = {
  data: any[];
  columns: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const TableGenerator = ({
  columns,
  data,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: '#f5f5f5',
          }}
        >
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.name}>
                {column.label}
              </TableCell>
            ))}
            {(onEdit || onDelete) && (
              <TableCell align="center">
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={`td_${column.name}_${row.id}`}
                >
                  {column.accessor
                    ? column.accessor(row)
                    : row[column.name]}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell align="center">
                  {onEdit && (
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() =>
                        onEdit(row.id)
                      }
                      sx={{
                        marginRight: 2,
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        onDelete(row.id)
                      }
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
