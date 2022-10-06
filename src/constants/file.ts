export type FileDetailsType = {
  title: string;
  accessor: (any) => string | number;
};
export const FILE_DETIALS: FileDetailsType[] = [
  {
    title: 'ID',
    accessor: (data) => data.id,
  },
  {
    title: 'name',
    accessor: (data) => data.name,
  },
  {
    title: 'type',
    accessor: (data) => data.mimeType,
  },
  {
    title: 'access mode',
    accessor: (data) => data.access,
  },
  {
    title: 'tags',
    accessor: (data) =>
      data.category
        .map(({ name }) => name)
        .join(', '),
  },
  {
    title: 'size',
    accessor: (data) =>
      `${data.size / 1000000} MB`,
  },
  {
    title: 'last modified',
    accessor: (data) => data.updatedAt,
  },
  {
    title: 'folder',
    accessor: (data) => data.folder ?? 'root',
  },
  {
    title: 'drive path',
    accessor: (data) => data.path,
  },
];
