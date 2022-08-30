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

export type FormModalProps = {
  id: string;
  open: boolean;
  handleClose: () => void;
  title: string;
  context: string;
  form?: GeneratorProps;
};

export const FormModal = ({
  id,
  open,
  handleClose,
  title,
  context,
  form,
}: FormModalProps) => {
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

export type ConfirmModalAction = {
  label: string;
  onClick: () => void;
  [inp: string]: any;
};

export type ConfirmModalProps = {
  id: string;
  open: boolean;
  handleClose: () => void;
  title: string;
  context: string;
  actions: ConfirmModalAction[];
};

export const ConfirmModal = ({
  id,
  open,
  handleClose,
  title,
  context,
  actions,
}: ConfirmModalProps) => {
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
      </DialogContent>
      <DialogActions>
        {actions.map(
          ({ label, onClick, ...others }) => (
            <Button
              key={label}
              onClick={onClick}
              {...others}
            >
              {label}
            </Button>
          ),
        )}
      </DialogActions>
    </Dialog>
  );
};
