import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { FieldsType } from 'constants/index';
import {
  Generator,
  GeneratorProps,
} from 'components/forms';

const Transition = React.forwardRef(
  function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return (
      <Slide
        direction="up"
        ref={ref}
        {...props}
      />
    );
  },
);

type ModalProps = {
  id: string;
  open: boolean;
  handleClose: () => void;
  title: string;
  context: string;
  form?: GeneratorProps;
};

export const Modal = ({
  id,
  open,
  handleClose,
  title,
  context,
  form,
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      TransitionComponent={Transition}
      aria-describedby={id}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={id}>
          {context}
        </DialogContentText>
        {!!form && (
          <Generator
            initialValues={form.initialValues}
            fields={form.fields}
            submit={form.submit}
            validator={form.validator}
            submitBtn={form.submitBtn}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
