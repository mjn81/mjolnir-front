import React from 'react';
import { Generator } from './Generator';
import {
  UploadFileSchema,
  UPLOAD_FILE_FIELDS,
  UPLOAD_FILE_INITIAL_VALUES,
  UPLOAD_FILE_VALIDATOR,
} from 'constants/index';

export const UploadFileForm = ({
  handleSubmit,
}: {
  handleSubmit: (
    data: UploadFileSchema,
    helpers: any,
  ) => any;
}) => {
  return (
    <Generator
      initialValues={UPLOAD_FILE_INITIAL_VALUES}
      fields={UPLOAD_FILE_FIELDS}
      validator={UPLOAD_FILE_VALIDATOR}
      submit={handleSubmit}
      submitBtn={<div>upload File</div>}
    />
  );
};
