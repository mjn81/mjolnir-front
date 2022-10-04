import { ColorBox } from 'components';
import React from 'react';
export type ColumnsType = {
  name: string;
  label: string;
  accessor: (row: any) => any;
  [inp: string]: any;
}[];

export const CATEGORY_COLUMNS: ColumnsType = [
  {
    name: 'name',
    label: 'Name',
    accessor: (row) => row.name,
  },
  {
    name: 'color',
    label: 'Color',
    accessor: (row) => (
      <ColorBox color={row.color} />
    ),
  },
  {
    name: 'id',
    label: 'ID',
    accessor: (row) => row.id,
  },
  {
    name: 'files',
    label: 'Files',
    accessor: (row) => row['_count'].files,
  },
  {
    name: 'tokens',
    label: 'Tokens',
    accessor: (row) => row['_count'].distToken,
  },
  {
    name: 'updatedAt',
    label: 'last modified',
    accessor: (row) =>
      new Date(row.updatedAt).toLocaleString(
        'en-Us',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      ),
  },
];

export const TOKEN_COLUMNS: ColumnsType = [
  {
    name: 'token',
    label: 'Token',
    accessor: (row) => row.token,
  },
];
