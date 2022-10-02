import React, { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

const item_variants = {
  open: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.25 * i,
    },
  }),
  closed: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

type SimpleMenuItemProps = {
  index: number;
  onClick?: (e?: MouseEvent) => void;
  className?: string;
  isOpen: boolean;
} & PropsWithChildren;

export const SimpleMenuItem = ({
  index,
  isOpen,
  onClick,
  className,
  children,
}: SimpleMenuItemProps) => {
  return (
    <motion.div
      custom={index}
      variants={item_variants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      onClick={() => {
        onClick && onClick();
      }}
      className={
        'cursor-pointer py-2 px-3 rounded-lg hover:bg-base-200 ' +
        className
      }
    >
      {children}
    </motion.div>
  );
};

const wrapper_variants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.1,

      when: 'beforeChildren',
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    display: 'none',
    transition: {
      duration: 0.1,
      when: 'afterChildren',
    },
  },
};

type SimpleMenuProps = {
  isOpen: boolean;
  className?: string;
  style?: object;
} & PropsWithChildren;

export const SimpleMenu = ({
  isOpen,
  className,
  style,
  children,
}: SimpleMenuProps) => {
  return (
    <motion.ul
      onClick={(e) => {
        e.stopPropagation();
      }}
      variants={wrapper_variants}
      animate={isOpen ? 'open' : 'closed'}
      className={
        'overflow-hidden border absolute z-50 dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-52 ' +
        className
      }
      style={style}
    >
      {children}
    </motion.ul>
  );
};
