import React from 'react';
import { Generator } from './Generator';
import {
  CreateFolderSchema,
  CREATE_FOLDER_FIELDS,
  CREATE_FOLDER_INITIAL_VALUES,
  CREATE_FOLDER_VALIDATOR,
  EditFileSchema,
  EDIT_FILE_FIELDS,
  EDIT_FILE_VALIDATOR,
  EDIT_FOLDER_FIELDS,
  EDIT_FOLDER_VALIDATOR,
  UploadFileSchema,
  UPLOAD_FILE_FIELDS,
  UPLOAD_FILE_INITIAL_VALUES,
  UPLOAD_FILE_VALIDATOR,
} from 'constants/index';
import {
  getFileDetails,
  getFolderDetails,
  postCreateFile,
  postCreateFolder,
  putEditFile,
  putEditFolder,
} from 'api';
import {
  useMutation,
  useQuery,
} from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudArrowUp,
  faFolderPlus,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export const UploadFileForm = ({
  folderId,
}: {
  folderId?: string;
}) => {
  const handleFiles = async (
    data: UploadFileSchema,
  ) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    data.category.forEach((c) => {
      formdata.append('category', c.value);
    });
    formdata.append('file', data.file);
    if (folderId)
      formdata.append('folder', folderId);
    const res = await postCreateFile(formdata);
    return res;
  };
  const { mutateAsync } = useMutation(
    'upload-file',
    handleFiles,
    {
      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    },
  );
  const handleSubmit = (
    data,
    { setSubmitting, resetForm },
  ) => {
    setSubmitting(true);
    mutateAsync(data).finally(() => {
      setSubmitting(false);
      resetForm();
    });
  };
  return (
    <Generator
      initialValues={UPLOAD_FILE_INITIAL_VALUES}
      fields={UPLOAD_FILE_FIELDS}
      validator={UPLOAD_FILE_VALIDATOR}
      submit={handleSubmit}
      submitBtn={
        <div>
          upload File
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className="ml-2"
          />
        </div>
      }
    />
  );
};

export const CreateFolderForm = ({
  parentId,
}: {
  parentId: string;
}) => {
  const { mutateAsync } = useMutation(
    'createFolder',
    postCreateFolder,
    {
      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    },
  );

  const handleSubmit = (
    data,
    { setSubmitting, resetForm },
  ) => {
    mutateAsync(data).finally(() => {
      setSubmitting(false);
      resetForm();
    });
  };
  return (
    <Generator
      fields={CREATE_FOLDER_FIELDS}
      initialValues={CREATE_FOLDER_INITIAL_VALUES(
        parentId,
      )}
      validator={CREATE_FOLDER_VALIDATOR}
      submitBtn={
        <span>
          Create Folder
          <FontAwesomeIcon
            icon={faFolderPlus}
            className="ml-2"
          />
        </span>
      }
      submit={handleSubmit}
    />
  );
};

export const EditFolderForm = ({
  id,
}: {
  id: string;
}) => {
  const { data } = useQuery(
    ['folder', id],
    async () => getFolderDetails(id),
    {
      enabled: !!id,
    },
  );
  const { mutateAsync } = useMutation(
    ['editFolder', id],
    async (data: CreateFolderSchema) =>
      putEditFolder(id, data),
    {
      onError: ({ message }) => {
        toast.error(message);
      },
    },
  );
  const initData = {
    name: data?.name ?? '',
  };
  const handleSubmit = (
    data,
    { setSubmitting },
  ) => {
    mutateAsync(data).finally(() => {
      setSubmitting(false);
    });
  };

  return (
    <Generator
      initialValues={initData}
      fields={EDIT_FOLDER_FIELDS}
      validator={EDIT_FOLDER_VALIDATOR}
      submitBtn={
        <span>
          edit folder
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="ml-2"
          />
        </span>
      }
      submit={handleSubmit}
    />
  );
};

export const EditFileForm = ({
  id,
}: {
  id: string;
}) => {
  const { data } = useQuery(
    ['file', id],
    async () => getFileDetails(id),
    {
      enabled: !!id,
    },
  );

  const { mutateAsync } = useMutation(
    ['editFile', id],
    async (data: EditFileSchema) =>
      putEditFile(id, data),
    {
      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    },
  );
  const initData = {
    name: data?.name ?? '',
    category: data?.category.map((c) => ({
      value: c.id,
      label: c.name,
    })),
  };

  const handleSubmit = (
    data: EditFileSchema,
    { setSubmitting },
  ) => {
    const actualData = {
      name: data.name,
      category: data.category.map((c) => c.value),
    };
    mutateAsync(actualData).finally(() => {
      setSubmitting(false);
    });
  };
  return (
    <Generator
      fields={EDIT_FILE_FIELDS}
      initialValues={initData}
      validator={EDIT_FILE_VALIDATOR}
      submitBtn={
        <span>
          edit file
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="ml-2"
          />
        </span>
      }
      submit={handleSubmit}
    />
  );
};
