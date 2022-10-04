import React from 'react';

import { ALERT_TYPES } from 'constants/index';
import { hexToRgb } from 'utils';
import { useFormikContext } from 'formik';
import { SliderPicker } from 'react-color';
import { toast } from 'react-toastify';

export const ColorBullet = ({
  color,
  onClick,
}: {
  color: string;
  onClick?: () => void;
}) => {
  return (
    <span
      onClick={onClick}
      style={{
        backgroundColor: color,
        outlineColor: color,
      }}
      className="cursor-pointer outline outline-1 outline-offset-2 border-transparent rounded-full w-6 h-6"
    />
  );
};
export const ColorBox = ({
  color,
}: {
  color: string;
}) => {
  const rgb = hexToRgb(color)?.join(', ');
  const afterCopy = () => {
    toast.success('copied!');
  };
  return (
    <section className="flex items-center space-x-3">
      <ColorBullet
        color={color}
        onClick={() => {
          navigator.clipboard.writeText(color);
          afterCopy();
        }}
      />
      <div>
        <p
          onClick={() => {
            navigator.clipboard.writeText(color);
            afterCopy();
          }}
          className="cursor-pointer"
        >
          <span className="text-gray-400 mr-1">
            hex :
          </span>
          {color}
        </p>
        {rgb && (
          <p
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(rgb);
              afterCopy();
            }}
          >
            <span className="text-gray-400 mr-1">
              rgb :
            </span>
            {rgb}
          </p>
        )}
      </div>
    </section>
  );
};

type ColorPickerProps = {
  name: string;
  placeholder?: string;
};

export const ColorPickerField = ({
  name,
  placeholder,
}: ColorPickerProps) => {
  const { setFieldValue, values } =
    useFormikContext();

  return (
    <div className="border border-1 p-3 bg-base-200 rounded-lg flex items-center justify-center space-x-3">
      <h4
        style={{ color: values && values[name] }}
        className="font-semibold"
      >
        {placeholder} :
      </h4>
      <SliderPicker
        className="flex-1"
        color={values && values[name]}
        onChange={(color) => {
          setFieldValue(name, color.hex);
        }}
      />
    </div>
  );
};
