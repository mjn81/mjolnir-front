import React from 'react';
import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {
  Form,
  Formik,
  Field,
  ErrorMessage,
} from 'formik';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';

import {
  ALERT_TYPES,
  LoginForm,
  LOGIN_INITIAL_VALUES,
  LOGIN_VALIDATOR,
  MESSAGE,
} from 'constants/index';
import { AuthLayout } from 'layouts';
import { setAuth, store } from 'context';
import { postLogin } from 'api';
import { log } from 'console';

const LoginPage = () => {
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync } = useMutation(postLogin, {
    onSuccess: ({ data }) => {
      store.dispatch(setAuth(data));
      enqueueSnackbar(data.message, {
        variant: ALERT_TYPES.SUCCESS,
      });
      navigation('/app', { replace: true });
    },
    onError: ({ message }) => {
      enqueueSnackbar(message, {
        variant: ALERT_TYPES.ERROR,
      });
    },
  });
  const handleLogin = (
    values: LoginForm,
    { setSubmitting },
  ) => {
    mutateAsync(values).finally(() => {
      setSubmitting(false);
    });
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
          Login.
        </Typography>
        <Box>
          <Formik
            initialValues={LOGIN_INITIAL_VALUES}
            validationSchema={LOGIN_VALIDATOR}
            onSubmit={handleLogin}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form>
                <Box>
                  {Object.keys(errors).length >
                    0 &&
                    Object.keys(errors).map(
                      (key, index) =>
                        touched[key] && (
                          <Alert
                            sx={{
                              mt: 1,
                            }}
                            severity={
                              ALERT_TYPES.ERROR
                            }
                            key={`er_log_${index}`}
                          >
                            {errors[key]}
                          </Alert>
                        ),
                    )}
                </Box>
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
                  login
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link to="/auth/forget-password">
                {MESSAGE['FORGET_PASSWORD_LINK']}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/auth/register">
                {MESSAGE['SIGN_UP_LINK']}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
