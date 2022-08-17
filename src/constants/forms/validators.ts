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
