import React from 'react';

import { Typography } from '@mui/material';
import {
  CreateCategorySchema,
  CREATE_CATEGORY_FIELDS,
  CREATE_CATEGORY_INITIAL_VALUES,
  CREATE_CATEGORY_VALIDATOR,
} from 'constants/index';
import { Generator } from './Generator';

type CreateCategoryProps = {
  submit: (
    values: CreateCategorySchema,
    options: any,
  ) => void;
};

export const CreateCategoryForm = ({
  submit,
}: CreateCategoryProps) => {
  return (
    <Generator
      initialValues={
        CREATE_CATEGORY_INITIAL_VALUES
      }
      fields={CREATE_CATEGORY_FIELDS}
      submit={submit}
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
