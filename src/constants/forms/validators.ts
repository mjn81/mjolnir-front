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


