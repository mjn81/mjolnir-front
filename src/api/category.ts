import { CreateCategoryForm } from 'constants/index';
import {
  getWithToken,
  postWithToken,
} from 'utils';

export const getCategories = async () => {
  return await getWithToken('/category');
};

export const postCategory = async (
  data: CreateCategoryForm,
) => {
  return await postWithToken('/category', data);
};
