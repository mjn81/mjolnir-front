import {
  faClipboard,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDistToken } from 'api';
import { Button, TextInput } from 'components';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
  const [token, setToken] = useState<string>('');
  const handleGetToken = () => {
    const data = {};
    getDistToken(data).then(
      ({ dist, message }) => {
        setToken(dist.token);
        toast.success(message);
      },
    );
  };
  return (
    <section className="flex items-start space-x-3">
      <div className="shadow border p-2 rounded-lg">
        <ul className="space-y-2">
          <li className="capitalize cursor-pointer hover:bg-base-200 rounded-md px-3 py-1">
            <FontAwesomeIcon
              icon={faCodeBranch}
            />{' '}
            dist token
          </li>
        </ul>
      </div>
      <div className="shadow border p-3 rounded-lg w-[30rem]">
        <h3 className="capitalize mb-2 font-bold text-xl">
          get dist token
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
          <Button full onClick={handleGetToken}>
            generate token
          </Button>
        </section>
      </div>
    </section>
  );
};

export default Settings;
