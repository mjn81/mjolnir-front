import { get, post, del, put } from 'utils';

export const getDrive = async (id?: string) => {
  if (!id) return await get('/drive');
  return await get(`/drive/${id}`);
};

export const postCreateFolder = async (data: {
  name: string;
  parent?: string;
}) =>
  post('/folder', {
    ...data,
  });

export const postCreateFile = async (data: any) =>
  post('/file', data, {
    'Content-Type': 'multipart/form-data',
  });

export const deleteFile = (id: string) =>
  del(`/file/${id}`);

export const putEditFolder = async (
  id: string,
  data: any,
) => put(`/folder/${id}`, data);

export const getFile = (
  id: string,
  setProgress: (number) => void,
  size: number,
) =>
  get(`file/${id}`, {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      // const total = parseFloat(
      //   progressEvent.currentTarget
      //     .responseHeaders['Content-Length'],
      // );
      // const current =
      //   progressEvent.currentTarget.response
      //     .length;
      const { loaded } = progressEvent;

      
      setProgress(
        Math.floor((loaded * 100) / size),
      );
    },
  });

export const getFolderDetails = (id: string) =>
  get(`/folder/details/${id}`);

export const getFileDetails = (id: string) =>
  get(`/file/details/${id}`);

export const putEditFile = (
  id: string,
  data: any,
) => put(`/file/${id}`, data);

export const deleteFolder = (id: string) =>
  del(`/folder/${id}`);
