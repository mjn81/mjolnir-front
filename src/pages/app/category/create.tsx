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
    <section className="flex justify-center items-center">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 space-y-2">
        <h2 className="capitalize font-semibold text-xl">
          create category
        </h2>
        <CreateCategoryForm
          submit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default CreateCategory;
