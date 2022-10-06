import Axios from 'axios';
import { getState } from 'context';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

axios.interceptors.request.use((config) => {
  const token = getState().token;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: token,
    };
  }
  return config;
});

export const get = async (
  uri: string,
  config?: any,
) => {
  return axios
    .get(uri, config)
    .then((res) => res.data);
};

export const post = async (
  uri: string,
  data?: any,
  headers?: any,
) => {
  return axios
    .post(uri, data, headers)
    .then((res) => res.data);
};

export const put = async (
  uri: string,
  data: any,
) => {
  return axios
    .put(uri, data)
    .then((res) => res.data);
};

export const del = async (uri: string) => {
  return axios
    .delete(uri)
    .then((res) => res.data);
};
