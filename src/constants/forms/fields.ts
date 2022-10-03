import { FormFieldTypes } from './types';
import { getCategories } from 'api';

export type FieldsType = {
  fieldType: FormFieldTypes;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  [inp: string]: any;
}[];

export const CREATE_CATEGORY_FIELDS: FieldsType =
  [
    {
      fieldType: FormFieldTypes.input,
      name: 'name',
      placeholder: 'Name',
      type: 'text',
      required: true,
    },
    {
      fieldType: FormFieldTypes.color,
      name: 'color',
      placeholder: 'Color',
      required: true,
    },
  ];

export const CREATE_FOLDER_FIELDS: FieldsType = [
  {
    fieldType: FormFieldTypes.input,
    name: 'name',
    placeholder: 'Name',
    type: 'text',
    required: true,
  },
];

export const UPLOAD_FILE_FIELDS: FieldsType = [
  {
    fieldType: FormFieldTypes.input,
    name: 'name',
    placeholder: 'Name',
    type: 'text',
    required: true,
  },
  {
    fieldType: FormFieldTypes.file,
    name: 'file',
    placeholder: 'File',
    type: 'file',
    required: true,
  },
  {
    fieldType: FormFieldTypes.multiSelect,
    name: 'category',
    placeholder: 'Category',
    getOptions: async () => {
      return getCategories().then(
        (res) => res.categories,
      );
    },
    required: true,
  },
];

export const EDIT_FOLDER_FIELDS: FieldsType = [
  {
    fieldType: FormFieldTypes.input,
    name: 'name',
    placeholder: 'Name',
    type: 'text',
    required: true,
  },
];
