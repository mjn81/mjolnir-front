import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorBox } from 'components';
import {
  TOKEN_LENGTH,
  DRIVE_NAME_LENGTH,
  TOKEN_ID_LENGTH,
} from 'constants/index';
import React from 'react';
import { summerize } from 'utils';

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
    accessor: (row) => {
      return (
        <span className="flex items-center">
          <span>
            {summerize(row.token, TOKEN_LENGTH)}
          </span>
          <FontAwesomeIcon
            icon={faClipboard}
            className="hover:bg-base-300 text-neutral rounded-lg cursor-pointer px-3 py-2.5 ml-3"
            onClick={() => {
              navigator.clipboard.writeText(
                row.token,
              );
            }}
          />
        </span>
      );
    },
  },
  {
    name: 'category',
    label: 'Category',
    accessor: (row) => {
      const tag = row.category;
      return (
        <span className="flex space-x-3">
          <span
            style={{
              color: tag?.color ?? '#d40b0b',
            }}
          >
            {row.category?.name ?? 'All Files'}
          </span>
        </span>
      );
    },
  },
  {
    name: 'file-count',
    label: 'Files',
    accessor: (row) =>
      row.category?.['_count']?.files ?? '_',
  },
  {
    name: 'token-id',
    label: 'ID',
    accessor: (row) =>
      summerize(row.id, TOKEN_ID_LENGTH),
  },
];
