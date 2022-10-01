import React from 'react';

import { Typography } from '@mui/material';
import {
  ALERT_TYPES,
  CreateCategorySchema,
  CREATE_CATEGORY_FIELDS,
  CREATE_CATEGORY_INITIAL_VALUES,
  CREATE_CATEGORY_VALIDATOR,
} from 'constants/index';
import { Generator } from './Generator';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { postCategory } from 'api';

export const CreateCategoryForm = () => {
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
    <Generator
      initialValues={
        CREATE_CATEGORY_INITIAL_VALUES
      }
      fields={CREATE_CATEGORY_FIELDS}
      submit={handleSubmit}
      validator={CREATE_CATEGORY_VALIDATOR}
      submitBtn={
        <Typography variant="h6" component="p">
          Create
        </Typography>
      }
    />
  );
};

type EditCategoryProps = {
  submit: (
    values: CreateCategorySchema,
    options: any,
  ) => void;
  data: CreateCategorySchema;
};

export const EditCategoryForm = ({
  submit,
  data,
}: EditCategoryProps) => {
  return (
    <Generator
      initialValues={data}
      fields={CREATE_CATEGORY_FIELDS}
      submit={submit}
      validator={CREATE_CATEGORY_VALIDATOR}
      submitBtn={
        <Typography variant="h6" component="p">
          Edit
        </Typography>
      }
    />
  );
};
