import * as Yup from 'yup';

export const LOGIN_VALIDATOR = Yup.object({
  email: Yup.string()
    .email()
    .required('Email is required'),
  password: Yup.string()
    .min(5)
    .max(8)
    .required('Password is required'),
});

export type LoginForm = Yup.InferType<
  typeof LOGIN_VALIDATOR
>;

export const REGISTER_VALIDATOR = Yup.object({
  email: Yup.string()
    .email()
    .required('Email is required'),
  password: Yup.string()
    .min(5)
    .max(8)
    .required('Password is required'),
  fullName: Yup.string().required(
    'Full name is required',
  ),
  userName: Yup.string().required(
    'Username is required',
  ),
});

export type RegisterForm = Yup.InferType<
  typeof REGISTER_VALIDATOR
>;

export const CREATE_CATEGORY_VALIDATOR =
  Yup.object({
    name: Yup.string().required(),
  }).required();

export type CreateCategorySchema = Yup.InferType<
  typeof CREATE_CATEGORY_VALIDATOR
>;

export const CREATE_FOLDER_VALIDATOR = Yup.object(
  {
    name: Yup.string().required(),
  },
).required();

export type CreateFolderSchema = Yup.InferType<
  typeof CREATE_FOLDER_VALIDATOR
>;

export const UPLOAD_FILE_VALIDATOR = Yup.object({
  name: Yup.string().required(),
  file: Yup.mixed().required(),
  category: Yup.string().required(),
}).required();

export type UploadFileSchema = Yup.InferType<
  typeof UPLOAD_FILE_VALIDATOR
>;
