import { Box, Typography } from '@mui/material';
import { postCategory } from 'api';
import { CreateCategoryForm } from 'components';
import {
  ALERT_TYPES,
  CreateCategorySchema,
} from 'constants/index';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useMutation } from 'react-query';

const CreateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync } = useMutation(
    'postCreateCategory',
    postCategory,
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
    values: CreateCategorySchema,
    { setSubmitting, resetForm },
  ) => {
    mutateAsync(values).then(() => {
      setSubmitting(false);
      resetForm();
    });
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
          create category
        </Typography>
        <CreateCategoryForm
          submit={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default CreateCategory;
