import { get, post, del } from 'utils';

export const getDrive = async (id?: string) => {
  if (!id) return await get('/drive');
  return await get(`drive/${id}`);
};

export const postCreateFolder = async (data: {
  name: string;
  parent?: string;
}) => {
  return await post('/folder', {
    ...data,
  });
};

export const postCreateFile = async (
  data: any,
) => {
  return await post('/file', data, {
    'Content-Type': 'multipart/form-data',
  });
};

export const deleteFile = async (id: string) => {
  return await del(`file/${id}`);
};
