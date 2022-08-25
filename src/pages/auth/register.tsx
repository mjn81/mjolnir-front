import React from 'react';
import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { postRegister } from 'api';
import {
  ALERT_TYPES,
  MESSAGE,
  RegisterForm,
  REGISTER_INITIAL_VALUES,
  REGISTER_VALIDATOR,
} from 'constants/index';
import { Field, Form, Formik } from 'formik';
import { AuthLayout } from 'layouts';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { setAuth, store } from 'context';

const RegisterPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync } = useMutation(
    postRegister,
    {
      onSuccess: ({ data }) => {
        store.dispatch(setAuth(data));
        enqueueSnackbar(data.message, {
          variant: ALERT_TYPES.SUCCESS,
        });
      },
      onError: ({ message }) => {
        enqueueSnackbar(message, {
          variant: ALERT_TYPES.ERROR,
        });
      },
    },
  );
  const handleRegister = (
    values: RegisterForm,
    { setSubmitting },
  ) => {
    mutateAsync(values).then(() =>
      setSubmitting(false),
    );
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          gutterBottom
          component="h1"
          variant="h3"
          color={'primary'}
          fontWeight={'bold'}
        >
          Sign Up.
        </Typography>
        <Box>
          <Formik
            initialValues={
              REGISTER_INITIAL_VALUES
            }
            validationSchema={REGISTER_VALIDATOR}
            onSubmit={handleRegister}
          >
            {({
              values,
              errors,
              isSubmitting,
            }) => (
              <Form>
                <Box>
                  {Object.keys(errors).length >
                    0 &&
                    Object.values(errors).map(
                      (message, index) => (
                        <Alert
                          sx={{
                            mt: 1,
                          }}
                          severity={
                            ALERT_TYPES.ERROR
                          }
                          key={`er_log_${index}`}
                        >
                          {message}
                        </Alert>
                      ),
                    )}
                </Box>
                <Field
                  as={TextField}
                  name="fullName"
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                />
                <Field
                  as={TextField}
                  name="userName"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                />
                <Field
                  as={TextField}
                  name="email"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                />
                <Field
                  as={TextField}
                  name="password"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ my: 2, padding: 1 }}
                  disabled={isSubmitting}
                >
                  sign up
                </Button>
              </Form>
            )}
          </Formik>

          <Link to="/auth/login">
            {MESSAGE['LOGIN_LINK']}
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
