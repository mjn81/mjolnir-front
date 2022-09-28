import React from 'react';

type TextInputProps = {
  [inp: string]: any;
};

export const TextInput = ({
  ...others
}: TextInputProps) => {
  return (
    <input
      className="block input input-bordered w-full"
      autoCorrect="false"
      {...others}
    />
  );
};
