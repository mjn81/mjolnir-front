import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  PropsWithChildren,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { DropdownItemType } from 'constants/index';

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

    transition: {
      duration: 0.1,
      when: 'afterChildren',
    },
  },
};

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

const arrow_variants = {
  open: {
    rotate: -180,
  },
  closed: {
    rotate: 0,
  },
};

type DropDownProps = {
  options: DropdownItemType[];
} & PropsWithChildren;

export const DropdownButton = ({
  options,
  children,
}: DropDownProps) => {
  const [isOpen, setIsOpen] =
    useState<boolean>(false);

  return (
    <div
      onClick={() => setIsOpen((state) => !state)}
      className="relative inline-block"
    >
      <button className="space-x-2 btn text-base text-neutral capitalize bg-base-200 border-neutral hover:bg-base-300">
        {children}
        <motion.span
          variants={arrow_variants}
          animate={isOpen ? 'open' : 'closed'}
        >
          <FontAwesomeIcon icon={faCaretDown} />
        </motion.span>
      </button>
      <motion.section
        onClick={(e) => {
          e.stopPropagation();
        }}
        variants={wrapper_variants}
        animate={isOpen ? 'open' : 'closed'}
        className="overflow-hidden border absolute  z-40 top-full mt-2 -left-2 dropdown-content menu p-2 shadow bg-base-100 rounded-lg w-52"
      >
        {options.map((option, index) => (
          <motion.div
            custom={index}
            variants={item_variants}
            animate={isOpen ? 'open' : 'closed'}
            onClick={(e) => {
              option.onClick && option.onClick();
            }}
            key={option.value}
            className={
              'cursor-pointer py-2 px-3 rounded-lg hover:bg-base-200 ' +
              option.style
            }
          >
            <FontAwesomeIcon
              icon={option.icon}
              className="mr-2"
            />
            {option.label}
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
};
