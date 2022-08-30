import { Box, Typography } from '@mui/material';
import { postCreateFile } from 'api';
import { UploadFileForm } from 'components';
import {
  ALERT_TYPES,
  UploadFileSchema,
} from 'constants/index';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

const Upload = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleFiles = async (
    data: UploadFileSchema,
  ) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('category', data.category);
    formdata.append('file', data.file);
    const res = await postCreateFile(data);
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
    { setSubmitting },
  ) => {
    setSubmitting(true);
    mutateAsync(data).finally(() =>
      setSubmitting(false),
    );
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width={{
          xs: '100%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
        }}
      >
        <Typography
          textTransform="capitalize"
          variant="h6"
          component="p"
        >
          Upload File
        </Typography>
        <UploadFileForm
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default Upload;
