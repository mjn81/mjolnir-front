import React from 'react';
import { Generator } from './Generator';
import {
  ALERT_TYPES,
  UploadFileSchema,
  UPLOAD_FILE_FIELDS,
  UPLOAD_FILE_INITIAL_VALUES,
  UPLOAD_FILE_VALIDATOR,
} from 'constants/index';
import { postCreateFile } from 'api';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

export const UploadFileForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleFiles = async (
    data: UploadFileSchema,
  ) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    data.category.forEach((c) => {
      formdata.append('category', c.value);
    });
    formdata.append('file', data.file);
    const res = await postCreateFile(formdata);
    return res;
  };
  const { mutateAsync } = useMutation(
    'upload-file',
    handleFiles,
    {
      onSuccess: ({ message }) => {
        enqueueSnackbar(message, {
          variant: ALERT_TYPES.SUCCESS,
        });
      },
      onError: ({ message }) => {
        enqueueSnackbar(message, {
          variant: ALERT_TYPES.ERROR,
        });
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
