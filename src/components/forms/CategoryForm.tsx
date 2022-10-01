import React from 'react';

import {
  ALERT_TYPES,
  CreateCategorySchema,
  CREATE_CATEGORY_FIELDS,
  CREATE_CATEGORY_INITIAL_VALUES,
  CREATE_CATEGORY_VALIDATOR,
} from 'constants/index';
import { Generator } from './Generator';
import { useSnackbar } from 'notistack';
import {
  useMutation,
  useQuery,
} from 'react-query';
import {
  getCategory,
  postCategory,
  putCategory,
} from 'api';

type FormProps = {
  onClose?: () => void;
};

export const CreateCategoryForm = ({
  onClose,
}: FormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync } = useMutation(
    'postCreateCategory',
    postCategory,
    {
      onSuccess: ({ message }) => {
        onClose && onClose();
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
        <p className="text-lg">Create</p>
      }
    />
  );
};

type EditCategoryProps = {
  id: string;
} & FormProps;

export const EditCategoryForm = ({
  id,
  onClose,
}: EditCategoryProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useQuery(
    ['getCategoryDetail', id],
    async () => getCategory(id),
    {
      enabled: !!id,
      onError: ({ message }) => {
        enqueueSnackbar(message, {
          variant: ALERT_TYPES.ERROR,
        });
      },
    },
  );
  const catData = {
    name: data?.category.name,
    color: data?.category.color,
  };
  const { mutateAsync } = useMutation(
    'postUpdateCategory',
    (data: CreateCategorySchema) =>
      putCategory(id, data),
    {
      onSuccess: ({ message }) => {
        onClose && onClose();
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
    <Generator
      initialValues={
        data
          ? catData
          : CREATE_CATEGORY_INITIAL_VALUES
      }
      fields={CREATE_CATEGORY_FIELDS}
      submit={handleSubmit}
      validator={CREATE_CATEGORY_VALIDATOR}
      submitBtn={<p className="text-lg">Edit</p>}
    />
  );
};
