import { DistTokenSchema } from 'constants/index';
import { post } from 'utils';

export const getDistToken = async (
  data: DistTokenSchema,
) => {
  return await post('dist/dist-token', data);
};
