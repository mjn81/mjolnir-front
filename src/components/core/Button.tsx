import React, {
  PropsWithChildren,
  MouseEvent,
} from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  onClick?: (e: MouseEvent) => void;
  disabled: boolean;
  type?: 'button' | 'submit' | 'reset';
} & PropsWithChildren;

export const Button = ({
  onClick,
  type,
  disabled,
  children,
}: ButtonProps) => {
  return (
    <button
      className="btn btn-primary w-full"
      onClick={(e: MouseEvent) => {
        onClick && onClick(e);
      }}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

type LinkProps = {
  path: string;
} & PropsWithChildren;

export const ButtonLink = ({
  path,
  children,
}: LinkProps) => {
  return (
    <Link
      className="btn btn-primary px-10 text-lg"
      to={path}
    >
      {children}
    </Link>
  );
};

export const SimpleLink = ({
  path,
  children,
}: LinkProps) => {
  return (
    <Link
      to={path}
      className="text-primary capitalize transition-colors hover:text-primary-focus"
    >
      {children}
    </Link>
  );
};
