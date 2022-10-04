import React from 'react';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Generator } from './Generator';
import {
  GenerateTokenSchema,
  GENERATE_TOKEN_FIELDS,
  GENERATE_TOKEN_INITIAL_VALUES,
  GENERATE_TOKEN_VALIDATOR,
} from 'constants/index';
import { getDistToken } from 'api';
import { toast } from 'react-toastify';

export const CreateTokenForm = ({
  onSubmit,
}: {
  onSubmit: (token: string) => void;
}) => {
  const handleGetToken = (
    data: GenerateTokenSchema,
    { setSubmitting },
  ) => {
    const tags = {
      category: data.category?.value ?? '',
    };
    getDistToken(tags)
      .then(({ dist, message }) => {
        onSubmit(dist.token);
        toast.success(message);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Generator
      fields={GENERATE_TOKEN_FIELDS}
      initialValues={
        GENERATE_TOKEN_INITIAL_VALUES
      }
      validator={GENERATE_TOKEN_VALIDATOR}
      submit={handleGetToken}
      submitBtn={
        <span>
          <FontAwesomeIcon
            className="mr-2"
            icon={faGears}
          />
          generate token
        </span>
      }
    />
  );
};
