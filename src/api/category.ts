import { CreateCategorySchema } from 'constants/index';
import { del, get, post, put } from 'utils';

export const getCategories = async () => {
  return await get('/category');
};

export const postCategory = async (
  data: CreateCategorySchema,
) => {
  return await post('/category', data);
};

export const getCategory = async (id: string) => {
  return await get(`/category/${id}`);
};

export const putCategory = async (
  id: string,
  data: CreateCategorySchema,
) => {
  return await put(`/category/${id}`, data);
};

export const deleteCategory = async (
  id: string,
) => {
  return await del(`/category/${id}`);
};
