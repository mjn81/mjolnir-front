import { FormFieldTypes } from './types';
import { getCategories } from 'api';

export type FieldsType = {
  fieldType: FormFieldTypes;
  name: string;
  type?: string;
  label?: string;
  required?: boolean;
  [inp: string]: any;
}[];

export const CREATE_CATEGORY_FIELDS: FieldsType =
  [
    {
      fieldType: FormFieldTypes.input,
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
  ];

export const CREATE_FOLDER_FIELDS: FieldsType = [
  {
    fieldType: FormFieldTypes.input,
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
  },
];

export const UPLOAD_FILE_FIELDS: FieldsType = [
  {
    fieldType: FormFieldTypes.input,
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
  },
  {
    fieldType: FormFieldTypes.file,
    name: 'file',
    label: 'File',
    type: 'file',
    required: true,
  },
  {
    fieldType: FormFieldTypes.select,
    name: 'category',
    label: 'Category',
    getOptions: async () => {
      return getCategories().then(
        (res) => res.categories,
      );
    },
    required: true,
  },
];
