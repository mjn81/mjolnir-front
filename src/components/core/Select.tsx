import React, { ChangeEvent } from 'react';
import { useFormikContext } from 'formik';
import { useQuery } from 'react-query';
import Select from 'react-select';

type SelectFieldProps = {
  name: string;
  label?: string;
  id?: string;
  placeholder?: string;
  getOptions?: () => Promise<any[]>;
  [key: string]: any;
};

export const SelectField = ({
  name,
  label,
  id,
  placeholder,
  getOptions,
  ...others
}: SelectFieldProps) => {
  const { setFieldValue, values } =
    useFormikContext();
  const { data } = useQuery(
    `name-${name}`,
    getOptions || (() => Promise.resolve([])),
  );
  const handleOnChange = (newValue) => {
    setFieldValue(name, newValue);
  };
  const options = data?.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
  return (
    <Select
      onChange={handleOnChange}
      value={values && values[name]}
      options={options}
      {...others}
    />
  );
};

export const MultiSelectField = ({
  name,
  label,
  id,
  placeholder,
  getOptions,
  ...others
}: SelectFieldProps) => {
  const { setFieldValue, values } =
    useFormikContext();
  const { data } = useQuery(
    `name-${name}`,
    getOptions || (() => Promise.resolve([])),
  );
  const options = data?.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
  const handleOnChange = (newValue) => {
    setFieldValue(name, [...newValue]);
  };
  return (
    <Select
      isMulti
      onChange={handleOnChange}
      value={values && values[name]}
      options={options}
      className="w-full"
      {...others}
    />
  );
};
