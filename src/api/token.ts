import { DistTokenSchema } from 'constants/index';
import { del, get, post } from 'utils';

export const getDistToken = async (
  data: DistTokenSchema,
) => post('dist/token', data);

export const getTokenList = async () =>
  get('dist/token/');

export const deleteToken = async (id: string) =>
  del(`dist/token/${id}`);

export const getShareRoute = async () =>
  get('dist/');

export const createShareRoute = async () =>
  post('dist/');
