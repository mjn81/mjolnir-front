import { Box, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export const FileDropField = ({
  name,
}: {
  name: string;
}) => {
  const {
    setFieldValue,
    values,
  }: {
    setFieldValue: (
      name: string,
      value: any,
    ) => void;
    values: any;
  } = useFormikContext();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFieldValue(name, file);
  }, []);
  const { getRootProps, getInputProps } =
    useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      sx={{
        marginBottom: 2,
        paddingY: 3,
        textAlign: 'center',
        border: '1px dashed #ccc',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      {!values[name] ? (
        <Typography component="p">
          Drag &lsquo;n&lsquo; drop some files
          here, or click to select files
        </Typography>
      ) : (
        <Typography component="p">
          {values[name].name}
        </Typography>
      )}
    </Box>
  );
};
