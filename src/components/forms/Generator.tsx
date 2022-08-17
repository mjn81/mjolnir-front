import React from 'react';

import { Button, TextField } from '@mui/material';
import {
  ALERT_TYPES,
  FormFieldTypes,
} from 'constants/index';
import { Field, Form, Formik } from 'formik';
import { AnyObjectSchema } from 'yup';

type Props = {
  submit: (data: any, helpers: any) => any;
  initialValues: {
    [inp: string]: any;
  };
  validator: AnyObjectSchema;
  fields: {
    fieldType: FormFieldTypes;
    name: string;
    type?: string;
    label?: string;
    [inp: string]: any;
  }[];
  submitBtn: React.ReactNode | React.ReactNode[];
};

export const Generator = ({
  initialValues,
  fields,
  validator,
  submitBtn,
  submit,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validator}
      onSubmit={submit}
      enableReinitialize={true}
    >
      {({
        isSubmitting,
        errors,
        setFieldValue,
      }) => (
        <Form>
          {fields.map(
            ({ fieldType, ...other }, index) => (
              <FieldGenerator
                key={index}
                fieldType={fieldType}
                setField={setFieldValue}
                {...other}
              />
            ),
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {submitBtn}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

type FieldProps = {
  fieldType: FormFieldTypes;
  name: string;
  setField: (
    name: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => void;
  [inp: string]: unknown;
};

const FieldGenerator = ({
  fieldType,
  ...others
}: FieldProps) => {
  switch (fieldType) {
    case FormFieldTypes.input:
      return (
        <Field
          as={TextField}
          variant="outlined"
          fullWidth
          {...others}
        />
      );
    // case FormFieldTypes.select:
    //   return (
    //     <Field
    //       as={SelectField}
    //       setValue={setField}
    //       {...others}
    //     />
    //   );
    // case FormFieldTypes.date:
    // return <DateField {...others} />;
    // case FormFieldTypes.multiselect:
    // return <MultipleSelect {...others} />;
    // case FormFieldTypes.file:
    // return <FileDrop {...others} />;
  }
};
