import Axios from 'axios';
import { getState, useAuthStore } from 'context';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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

export const get = async (uri: string) => {
  return axios.get(uri).then((res) => res.data);
};

export const post = async (
  uri: string,
  data: any,
) => {
  return axios
    .post(uri, data)
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
