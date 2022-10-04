import {
  faClipboard,
  faCodeBranch,
  faGears,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDistToken } from 'api';
import {
  Button,
  Generator,
  PaperCard,
  SelectField,
  TableGenerator,
  TextInput,
} from 'components';
import {
  GenerateTokenSchema,
  GENERATE_TOKEN_FIELDS,
  GENERATE_TOKEN_INITIAL_VALUES,
  GENERATE_TOKEN_VALIDATOR,
} from 'constants/index';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
  const [token, setToken] = useState<string>('');
  const handleGetToken = (
    data: GenerateTokenSchema,
    { setSubmitting },
  ) => {
    const tags = {
      category: data.category?.value ?? '',
    };
    getDistToken(tags)
      .then(({ dist, message }) => {
        setToken(dist.token);
        toast.success(message);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="flex items-start space-x-3">
      <PaperCard className="w-[30rem]">
        <h3 className="capitalize mb-2 space-x-2 font-bold text-xl">
          <FontAwesomeIcon icon={faCodeBranch} />
          <span>get dist token</span>
        </h3>
        <p className="text-sm mb-4">
          do you want to share your files with
          friends or clients? get a token right
          now !
        </p>
        <section className="space-y-2">
          <span className="relative block">
            <TextInput
              value={token ?? ''}
              disabled
              type="password"
            />
            <FontAwesomeIcon
              icon={faClipboard}
              className="bg-base-200 hover:bg-base-300 rounded-lg absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer py-2.5 px-3"
              onClick={() => {
                navigator.clipboard.writeText(
                  token,
                );
              }}
            />
          </span>
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
        </section>
      </PaperCard>

      <PaperCard className="">
        {/* <TableGenerator columns={} /> */}
      </PaperCard>
    </section>
  );
};

export default Settings;
