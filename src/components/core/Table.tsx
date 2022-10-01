import React from 'react';
import { Button } from './Button';

type Props = {
  data: any[];
  columns: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  counter?: boolean;
};

export const TableGenerator = ({
  columns,
  data,
  counter,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table
        className="table w-full"
        aria-label="simple table"
      >
        <thead>
          <tr>
            {counter && <th>#</th>}
            {columns.map((column) => (
              <th key={column.name}>
                {column.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              {counter && <td>{index + 1}</td>}
              {columns.map((column) => (
                <td
                  key={`td_${column.name}_${row.id}`}
                >
                  {column.accessor
                    ? column.accessor(row)
                    : row[column.name]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="space-x-2 text-center">
                  {onEdit && (
                    <Button
                      color="btn-warning"
                      className="btn-sm text-primary-content shadow shadow-warning hover:shadow-md hover:shadow-warning"
                      onClick={() =>
                        onEdit(row.id)
                      }
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      color="btn-error"
                      className="btn-sm text-primary-content shadow shadow-error hover:shadow-md hover:shadow-error"
                      onClick={() =>
                        onDelete(row.id)
                      }
                    >
                      Delete
                    </Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
