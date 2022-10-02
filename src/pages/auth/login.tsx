import React from 'react';
import {
  Button,
  SimpleLink,
  TextInput,
} from 'components';
import { Form, Formik, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import {
  ALERT_TYPES,
  LoginForm,
  LOGIN_INITIAL_VALUES,
  LOGIN_VALIDATOR,
} from 'constants/index';
import { AuthLayout } from 'layouts';
import { postLogin } from 'api';
import { useAuthStore } from 'context';
import { mapUserToState } from 'utils/user';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigation = useNavigate();
  const login = useAuthStore(
    (state) => state.login,
  );
  const { mutateAsync } = useMutation(postLogin, {
    onSuccess: (data) => {
      const user = mapUserToState(data);
      login(user, data.token);
      toast.success(data.message);
      navigation('/app', { replace: true });
    },
    onError: ({ response }) => {
      const message = Object.values(
        response.data.errors,
      ).map((e: any) => e.name ?? e.message);
      toast.error(message.join(', '));
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
      <section className="sm:w-[500px]  hero-content flex-col">
        <section className="card w-full shadow-xl bg-base-100">
          <section className="card-body">
            <h1 className="mb-6 capitalize font-semibold text-primary text-center text-5xl">
              login
            </h1>
            <section className="form-control">
              <Formik
                initialValues={
                  LOGIN_INITIAL_VALUES
                }
                validationSchema={LOGIN_VALIDATOR}
                onSubmit={handleLogin}
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
                      name="email"
                      type="email"
                      required
                      placeholder="Email Address"
                    />
                    <Field
                      as={TextInput}
                      type="password"
                      name="password"
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
                      login
                    </Button>
                  </Form>
                )}
              </Formik>
            </section>
          </section>
        </section>
        <section className="w-full flex justify-between px-2">
          <SimpleLink path="/auth/register">
            dont have an account?
          </SimpleLink>
          <SimpleLink path="/auth/forget-pass">
            forget password
          </SimpleLink>
        </section>
      </section>
    </AuthLayout>
  );
};

export default LoginPage;
