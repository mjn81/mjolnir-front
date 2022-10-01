import React, {
  PropsWithChildren,
  MouseEvent,
} from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  full?: boolean;
  className?: string;
} & PropsWithChildren;

export const Button = ({
  onClick,
  type,
  disabled,
  color,
  full,
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      className={
        'btn ' +
        (color ? color + ' ' : 'btn-primary ') +
        (full ? ' w-full' : '') +
        (className ? ' ' + className : '')
      }
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
  className?: string;
} & PropsWithChildren;

export const ButtonLink = ({
  path,
  className,
  children,
}: LinkProps) => {
  return (
    <Link
      className={
        (className ? className + ' ' : '') +
        'btn btn-primary capitalize transition-colors'
      }
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
