export type ColumnsType = {
  name: string;
  label: string;
  accessor: (row: any) => any;
  [inp: string]: any;
}[];

export const CATEGORY_COLUMNS: ColumnsType = [
  {
    name: 'id',
    label: 'ID',
    accessor: (row) => row.id,
  },
  {
    name: 'name',
    label: 'Name',
    accessor: (row) => row.name,
  },
];
