import {
  LoginForm,
  RegisterForm,
} from 'constants/index';
import { post, get } from 'utils';

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

export const getProfile = async () => {
  return await get('user/me');
};

export const getDistToken = async () => {
  return await get('auth/distToken');
};
