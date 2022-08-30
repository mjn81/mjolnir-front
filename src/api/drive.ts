import {
  getWithToken,
  postWithToken,
} from 'utils';

export const getDrive = async (id?: string) => {
  if (!id) return await getWithToken('/drive');
  return await getWithToken(`drive/${id}`);
};

export const postCreateFolder = async (data: {
  name: string;
  parent?: string;
}) => {
  return await postWithToken('/folder', {
    ...data,
  });
};

export const postCreateFile = async (
  data: any,
) => {
  return await postWithToken('/file', data, {
    'Content-Type': 'multipart/form-data',
  });
};
