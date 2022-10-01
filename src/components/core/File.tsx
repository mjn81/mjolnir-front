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
    <div
      className="mb-2 py-5 text-center border border-dashed border-gray-300 cursor-pointer rounded-lg"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {!values[name] ? (
        <p>
          Drag &lsquo;n&lsquo; drop some files
          here, or click to select files
        </p>
      ) : (
        <p>{values[name].name}</p>
      )}
    </div>
  );
};
