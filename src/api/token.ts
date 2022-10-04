import { DistTokenSchema } from 'constants/index';
import { del, get, post } from 'utils';

export const getDistToken = async (
  data: DistTokenSchema,
) => {
  return await post('dist/token', data);
};

export const getTokenList = async () => {
  return await get('dist/token/');
};

export const deleteToken = async (id: string) => {
  return await del(`dist/token/${id}`);
};

export const getShareRoute = async () => {
  return await get('dist/');
};
