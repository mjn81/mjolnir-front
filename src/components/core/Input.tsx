import {
  faM,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      spellCheck="false"
      {...others}
    />
  );
};

export const SearchInput = () => {
  return (
    <div className="relative">
      <label
        htmlFor="search_input"
        className="label absolute left-2 top-1/2 -translate-y-1/2"
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
        />
      </label>
      <input
        id="search_input"
        type="search"
        placeholder="Search..."
        className="placeholder:text-neutral-focus py-0 h-10 input focus:outline-base-200 focus:outline-offset-0 px-10"
      />
      <label
        htmlFor="search_input"
        className="space-x-1 absolute right-2 top-1/2 -translate-y-1/2"
      >
        <span className="code-font kbd kbd-sm bg-gray-100 border-gray-300 text-gray-500 ">
          ctrl
        </span>
        <span className="code-font kbd kbd-sm bg-gray-100 border-gray-300 text-gray-500 ">
          k
        </span>
      </label>
    </div>
  );
};
