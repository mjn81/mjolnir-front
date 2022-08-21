import {
  LoginForm,
  RegisterForm,
} from 'constants/index';
import { post } from 'utils';

export const postRegister = async (
  data: RegisterForm,
) => {
  return await post('auth/register', data);
};

export const postLogin = async (
  data: LoginForm,
) => {
  return await post('auth/login', data);
};
