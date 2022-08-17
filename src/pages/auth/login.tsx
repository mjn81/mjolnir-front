import React from 'react';
import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik, Field } from 'formik';
import { Link } from 'react-router-dom';

import {
  ALERT_TYPES,
  LOGIN_INITIAL_VALUES,
  LOGIN_VALIDATOR,
} from 'constants';
import { AuthLayout } from 'layouts';
const LoginPage = () => {
  const handleSubmit = (values: any) => {};

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
            onSubmit={handleSubmit}
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
                  name="email"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  autoFocus
                />
                <Field
                  as={TextField}
                  name="password"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ my: 2, padding: 1 }}
                >
                  sign in
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link to="/forget-password">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
