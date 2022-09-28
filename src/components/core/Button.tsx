import React, {
  PropsWithChildren,
  MouseEvent,
} from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  onClick,
}: {
  onClick: (e: MouseEvent) => void;
} & PropsWithChildren) => {
  return (
    <button
      className="btn"
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </button>
  );
};

export const ButtonLink = ({
  path,
  children,
}: {
  path: string;
} & PropsWithChildren) => {
  return (
    <Link
      className="btn text-cwhite capitalize text-xl  bg-primary border-primary hover:bg-hoverprimary hover:border-hoverprimary px-8"
      to={path}
    >
      {children}
    </Link>
  );
};
