import { getWithToken } from 'utils';

export const getDrive = async (id?: string) => {
  if (!id) return await getWithToken('/drive');
  return await getWithToken(`drive/${id}`);
};
