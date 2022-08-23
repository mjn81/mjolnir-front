import { store } from 'context';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getWithToken = async (
  uri: string,
) => {
  return axiosInstance
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
) => {
  return axiosInstance
    .post(uri, data, {
      headers: {
        Authorization:
          store.getState().auth.token,
      },
    })
    .then((res) => res.data);
};

export const post = (uri: string, data: any) => {
  return axiosInstance.post(uri, data);
};
