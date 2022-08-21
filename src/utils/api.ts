import { store } from 'context';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    // @ts-ignore
    Authorization: store.getState().auth.token,
  },
});

// export const get = (uri: string) => {
//   const url = `${process.env.BASE_URL}/${uri}`;
//   return axios.get(url);
// };

export const post = (uri: string, data: any) => {
  return axios.post(uri, data);
};
