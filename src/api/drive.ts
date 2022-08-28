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
