import React from 'react';

import {
  Alert,
  Box,
  Button,
  TextField,
} from '@mui/material';
import {
  ALERT_TYPES,
  FormFieldTypes,
} from 'constants/index';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';
import { AnyObjectSchema } from 'yup';
import { FieldsType } from 'constants/index';

type Props = {
  submit: (data: any, helpers: any) => any;
  initialValues: {
    [inp: string]: any;
  };
  validator: AnyObjectSchema;
  fields: FieldsType;
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
          <Box sx={{ marginBottom: 2 }}>
            {Object.keys(errors).length > 0 &&
              Object.keys(errors).map(
                (name, index) => (
                  <Alert
                    sx={{
                      mt: 1,
                    }}
                    severity={ALERT_TYPES.ERROR}
                    key={`er_log_${index}`}
                  >
                    <ErrorMessage name={name} />
                  </Alert>
                ),
              )}
          </Box>
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
            variant="contained"
            fullWidth
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
          sx={{
            marginBottom: 2,
          }}
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
