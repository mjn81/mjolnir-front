import { ALERT_TYPES } from 'constants/index';
import { useSnackbar } from 'notistack';
import React from 'react';
import { hexToRgb } from 'utils';

export const ColorBox = ({
  color,
}: {
  color: string;
}) => {
  const rgb = hexToRgb(color)?.join(', ');
  const { enqueueSnackbar } = useSnackbar();
  const afterCopy = () => {
    enqueueSnackbar('copied!', {
      variant: ALERT_TYPES.SUCCESS,
    });
  };
  return (
    <section className="flex items-center space-x-3">
      <span
        onClick={() => {
          navigator.clipboard.writeText(color);
          afterCopy();
        }}
        style={{
          backgroundColor: color,
          outlineColor: color,
        }}
        className="cursor-pointer outline outline-1 outline-offset-2 border-base-300 rounded-full w-6 h-6"
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
