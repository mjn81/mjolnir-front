import React from 'react';

import { FormFieldTypes } from 'constants/index';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';
import { AnyObjectSchema } from 'yup';
import { FieldsType } from 'constants/index';
import {
  Button,
  FileDropField,
  SelectField,
  TextInput,
} from 'components';

export type GeneratorProps = {
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
}: GeneratorProps) => {
  return (
    <section className="form-control">
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
          touched,
        }) => (
          <Form className="space-y-4">
            {fields.map(
              (
                { fieldType, ...other },
                index,
              ) => (
                <FieldGenerator
                  key={index}
                  fieldType={fieldType}
                  setField={setFieldValue}
                  {...other}
                />
              ),
            )}
            {Object.keys(errors).length > 0 && (
              <ul className="list-disc mx-5">
                {Object.keys(errors).map(
                  (key, index) =>
                    touched[key] && (
                      <li
                        className="text-error"
                        key={`er_log_${index}`}
                      >
                        <ErrorMessage
                          name={key}
                        />
                      </li>
                    ),
                )}
              </ul>
            )}
            <Button
              type="submit"
              full
              disabled={isSubmitting}
            >
              {submitBtn}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
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
  name,
  setField,
  ...others
}: FieldProps) => {
  switch (fieldType) {
    case FormFieldTypes.input:
      return (
        <Field
          as={TextInput}
          name={name}
          {...others}
        />
      );
    case FormFieldTypes.select:
      return (
        <SelectField name={name} {...others} />
      );
    case FormFieldTypes.file:
      return <FileDropField name={name} />;
  }
};
