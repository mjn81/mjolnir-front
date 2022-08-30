import React, { useEffect } from 'react';
import {
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { Box } from '@mui/system';
import {
  useQueries,
  useQuery,
} from 'react-query';

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
  const {
    setFieldValue,
    values,
  }: {
    setFieldValue: (
      name: string,
      value: string,
    ) => void;
    values: any;
  } = useFormikContext();
  const { data } = useQuery(
    'get-categories',
    getOptions || (() => Promise.resolve([])),
  );
  return (
    <Box marginBottom={5}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        fullWidth
        labelId={id}
        id={name}
        value={values[name]}
        label={placeholder}
        placeholder={placeholder}
        onChange={(e) => {
          setFieldValue(
            name,
            e.target.value as string,
          );
        }}
        {...others}
      >
        {data?.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
