import { CreateCategorySchema } from 'constants/index';
import {
  deleteWithToken,
  getWithToken,
  postWithToken,
  putWithToken,
} from 'utils';

export const getCategories = async () => {
  return await getWithToken('/category');
};

export const postCategory = async (
  data: CreateCategorySchema,
) => {
  return await postWithToken('/category', data);
};

export const getCategory = async (id: string) => {
  return await getWithToken(`/category/${id}`);
};

export const putCategory = async (
  id: string,
  data: CreateCategorySchema,
) => {
  return await putWithToken(
    `/category/${id}`,
    data,
  );
};

export const deleteCategory = async (
  id: string,
) => {
  return await deleteWithToken(`/category/${id}`);
};
