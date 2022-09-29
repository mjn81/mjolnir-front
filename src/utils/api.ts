import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
axios.interceptors.request.use((config) => {
  console.log(config);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: token,
    };
  }
  return config;
});

export const get = async (uri: string) => {
  return axios.get(uri);
};

export const post = async (
  uri: string,
  data: any,
) => {
  return axios.post(uri, data);
};

export const put = async (
  uri: string,
  data: any,
) => {
  return axios.put(uri, data);
};

export const del = async (uri: string) => {
  return axios.delete(uri);
};
