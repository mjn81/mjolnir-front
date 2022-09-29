import Axios from 'axios';

const axiosWithToken = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
axiosWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
    }
    return config;
  },
);

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const get = async (uri: string) => {
  return axiosWithToken
    .get(uri)
    .then((res) => res.data);
};

export const post = async (
  uri: string,
  data: any,
  headers?: object,
) => {
  return axiosWithToken
    .post(uri, data)
    .then((res) => res.data);
};

export const put = async (
  uri: string,
  data: any,
) => {
  return axiosWithToken
    .put(uri, data)
    .then((res) => res.data);
};

export const del = async (uri: string) => {
  return axiosWithToken
    .delete(uri)
    .then((res) => res.data);
};

export const postWithoutToken = async (
  uri: string,
  data: any,
) => {
  return axios.post(uri, data);
};

export const getWithoutToken = async (
  uri: string,
) => {
  return axios.get(uri);
};
