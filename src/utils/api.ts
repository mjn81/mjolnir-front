import { store } from 'context';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getWithToken = async (
  uri: string,
) => {
  return axios
    .get(uri, {
      headers: {
        Authorization:
          store.getState().auth.token,
      },
    })
    .then((res) => res.data);
};

export const postWithToken = async (
  uri: string,
  data: any,
  headers?: object,
) => {
  return axios
    .post(uri, data, {
      headers: {
        Authorization:
          store.getState().auth.token,
        ...headers,
      },
    })
    .then((res) => res.data);
};

export const putWithToken = async (
  uri: string,
  data: any,
) => {
  return axios
    .put(uri, data, {
      headers: {
        Authorization:
          store.getState().auth.token,
      },
    })
    .then((res) => res.data);
};

export const deleteWithToken = async (
  uri: string,
) => {
  return axios
    .delete(uri, {
      headers: {
        Authorization:
          store.getState().auth.token,
      },
    })
    .then((res) => res.data);
};

export const post = async (
  uri: string,
  data: any,
) => {
  return axios.post(uri, data);
};

export const get = async (uri: string) => {
  return axios.get(uri);
};
