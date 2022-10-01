import React, {
  MouseEvent,
  PropsWithChildren,
} from 'react';
import { motion } from 'framer-motion';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Portal } from 'react-portal';
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
} & PropsWithChildren;

export const Modal = ({
  isOpen,
  children,
  onClose,
}: ModalProps) => {
  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const card_variants = {
    open: { y: 0 },
    close: { y: -650 },
  };
  const bg_variants = {
    open: { opacity: 1, display: 'flex' },
    close: {
      opacity: 0,
      display: 'none',
      transition: {
        display: {
          delay: 0.1,
        },
      },
    },
    none: {
      opacity: 0,
      display: 'none',
    },
  };

  return (
    <Portal
      node={
        document &&
        document.getElementById('modal')
      }
    >
      <motion.section
        variants={bg_variants}
        initial="none"
        exit="none"
        animate={isOpen ? 'open' : 'close'}
        onClick={handleClose}
        className="absolute h-screen w-screen top-0 left-0 justify-center items-center bg-neutral-focus bg-opacity-60 z-20"
      >
        <motion.div
          variants={card_variants}
          animate={isOpen ? 'open' : 'close'}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="relative overflow-visible card w-full sm:w-4/5 md:w-3/4 lg:w-1/2 bg-primary-content"
        >
          <FontAwesomeIcon
            onClick={handleClose}
            className="absolute top-3 right-3 text-2xl text-error cursor-pointer"
            icon={faCircleXmark}
          />

          <div className="card-body">
            {children}
          </div>
        </motion.div>
      </motion.section>
    </Portal>
  );
};
