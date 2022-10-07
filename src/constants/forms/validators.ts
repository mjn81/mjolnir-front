import * as Yup from 'yup';

export const LOGIN_VALIDATOR = Yup.object({
  email: Yup.string()
    .email()
    .required('Email is required'),
  password: Yup.string()
    .min(5)
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
    .max(9)
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
    color: Yup.string().required(),
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
  category: Yup.array(
    Yup.object({
      label: Yup.string().required(),
      value: Yup.string().required(),
    }),
  )
    .min(1)
    .required(),
}).required();

export type UploadFileSchema = Yup.InferType<
  typeof UPLOAD_FILE_VALIDATOR
>;

export type DistTokenSchema = {
  category?: string;
};

export const EDIT_FOLDER_VALIDATOR = Yup.object({
  name: Yup.string().required(),
}).required();

export type EditFolderSchema = Yup.InferType<
  typeof EDIT_FOLDER_VALIDATOR
>;

export const EDIT_FILE_VALIDATOR = Yup.object({
  name: Yup.string().required(),
  category: Yup.array().min(1).required(),
}).required();

export type EditFileSchema = Yup.InferType<
  typeof EDIT_FILE_VALIDATOR
>;

export const GENERATE_TOKEN_VALIDATOR =
  Yup.object({
    category: Yup.object({
      value: Yup.string().required(),
      label: Yup.string().required(),
    })
      .optional()
      .nullable(),
  }).required();

export type GenerateTokenSchema = Yup.InferType<
  typeof GENERATE_TOKEN_VALIDATOR
>;
