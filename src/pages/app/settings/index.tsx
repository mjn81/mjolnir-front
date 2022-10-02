import {
  faClipboard,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDistToken } from 'api';
import { Button, TextInput } from 'components';
import { ALERT_TYPES } from 'constants/index';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
  const [token, setToken] = useState<string>('');
  const handleGetToken = () => {
    getDistToken().then(({ token, message }) => {
      setToken(token);
      toast.success(message);
    });
  };
  console.log(token);
  return (
    <section className="flex items-start space-x-3">
      <div className="shadow p-2 rounded-lg">
        <ul className="space-y-2">
          <li className="capitalize cursor-pointer hover:bg-base-200 rounded-lg px-2 py-1">
            dist token
          </li>
        </ul>
      </div>
      <div className="shadow p-3 rounded-lg w-[30rem]">
        <h3 className="capitalize mb-2 font-bold text-xl">
          get dist token
        </h3>
        <p className="text-sm mb-4">
          do you want to share your files with
          friends? get a token right now !
        </p>
        <section className="space-y-2">
          <span className="relative block">
            <TextInput
              value={token ?? ''}
              disabled
            />
            <FontAwesomeIcon
              icon={faClipboard}
              className="hover:bg-base-300 rounded-lg absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer py-2.5 px-3"
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
