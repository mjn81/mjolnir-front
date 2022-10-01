import React from 'react';
import {
  Button,
  SimpleLink,
  TextInput,
} from 'components';
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
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { mapUserToState } from 'utils/user';
import { useAuthStore } from 'context';

const RegisterPage = () => {
  const login = useAuthStore(
    (state) => state.login,
  );
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();
  const { mutateAsync } = useMutation(
    postRegister,
    {
      onSuccess: (data) => {
        const user = mapUserToState(data);
        login(user, data.token);
        enqueueSnackbar(data.message, {
          variant: ALERT_TYPES.SUCCESS,
        });
        navigation('/app', {
          replace: true,
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
    mutateAsync(values).finally(() =>
      setSubmitting(false),
    );
  };

  return (
    <AuthLayout>
      <section className="sm:w-[500px]  hero-content flex-col">
        <section className="card w-full  shadow-xl bg-base-100">
          <section className="card-body">
            <h1 className="mb-6 capitalize font-semibold text-primary text-center text-5xl">
              signup
            </h1>
            <section className="form-control">
              <Formik
                initialValues={
                  REGISTER_INITIAL_VALUES
                }
                validationSchema={
                  REGISTER_VALIDATOR
                }
                onSubmit={handleRegister}
              >
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <Form className="space-y-4">
                    <Field
                      as={TextInput}
                      name="fullName"
                      required
                      placeholder="Full Name"
                    />
                    <Field
                      as={TextInput}
                      name="userName"
                      required
                      placeholder="Username"
                    />
                    <Field
                      as={TextInput}
                      name="email"
                      type="email"
                      required
                      placeholder="Email Address"
                    />
                    <Field
                      as={TextInput}
                      name="password"
                      type="password"
                      required
                      placeholder="Password"
                    />
                    {Object.keys(errors).length >
                      0 && (
                      <ul className="list-disc mx-5">
                        {Object.keys(errors).map(
                          (key, index) =>
                            touched[key] && (
                              <li
                                className="text-error"
                                key={`er_log_${index}`}
                              >
                                {errors[key]}
                              </li>
                            ),
                        )}
                      </ul>
                    )}
                    <Button
                      type="submit"
                      full
                      disabled={isSubmitting}
                    >
                      sign up
                    </Button>
                  </Form>
                )}
              </Formik>
            </section>
          </section>
        </section>
        <section className="w-full flex justify-between px-2">
          <SimpleLink path="/auth/login">
            already have an account?
          </SimpleLink>
          <SimpleLink path="/auth/forget-pass">
            forget password
          </SimpleLink>
        </section>
      </section>
    </AuthLayout>
  );
};

export default RegisterPage;
