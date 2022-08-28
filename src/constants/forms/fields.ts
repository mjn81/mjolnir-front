import { FormFieldTypes } from './types';

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
