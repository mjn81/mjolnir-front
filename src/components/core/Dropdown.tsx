import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  PropsWithChildren,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { DropdownItemType } from 'constants/index';
import {
  SimpleMenu,
  SimpleMenuItem,
} from './Menu';

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
      <SimpleMenu isOpen={isOpen}>
        {options.map((option, index) => (
          <SimpleMenuItem
            key={`dropdown_${option.value}_${index}`}
            index={index}
            onClick={() => {
              option.onClick && option.onClick();
              setIsOpen(false);
            }}
            isOpen={isOpen}
            className={option.style}
          >
            <FontAwesomeIcon
              icon={option.icon}
              className="mr-2"
            />
            {option.label}
          </SimpleMenuItem>
        ))}
      </SimpleMenu>
    </div>
  );
};
