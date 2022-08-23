import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  useMutation,
  useQuery,
} from 'react-query';
import { getCategory, putCategory } from 'api';
import { useSnackbar } from 'notistack';
import {
  ALERT_TYPES,
  CreateCategorySchema,
} from 'constants/index';
import { EditCategoryForm } from 'components';

const EditCategory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { data } = useQuery(
    ['getCategoryDetail', id],
    async () => getCategory(id as string),
    {
      enabled: !!id,
      onError: ({ message }) => {
        enqueueSnackbar(message, {
          variant: ALERT_TYPES.ERROR,
        });
      },
    },
  );
  const { mutateAsync } = useMutation(
    'postUpdateCategory',
    (data: CreateCategorySchema) =>
      putCategory(id as string, data),
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
    value: CreateCategorySchema,
    { setSubmitting },
  ) => {
    mutateAsync(value).then(() => {
      setSubmitting(false);
    });
  };
  return (
    <Box>
      {data && (
        <EditCategoryForm
          submit={handleSubmit}
          data={{ name: data.category.name }}
        />
      )}
    </Box>
  );
};

export default EditCategory;
