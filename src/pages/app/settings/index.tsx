import React, { useState } from 'react';
import {
  faClipboard,
  faCodeBranch,
  faPlus,
  faRetweet,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  createShareRoute,
  deleteToken,
  getShareRoute,
  getTokenList,
} from 'api';
import {
  Button,
  CreateTokenForm,
  Modal,
  ModalFormCard,
  PaperCard,
  TableGenerator,
  TextArea,
  TextInput,
} from 'components';

import {
  useMutation,
  useQuery,
} from 'react-query';
import { TOKEN_COLUMNS } from 'constants/index';
import useModal from 'hooks/useModal';

const Settings = () => {
  const [token, setToken] = useState<string>('');
  const [deleteId, setDeleteId] =
    useState<string>('');
  const { data, isLoading, refetch } = useQuery(
    'getTokenList',
    getTokenList,
  );
  const {
    data: shareRoute,
    refetch: refetchShareRoute,
  } = useQuery('getShareRoute', getShareRoute);
  const { isOpen, closeModal, openModal } =
    useModal();
  const backUrl = import.meta.env.VITE_DIST_URL;
  const shareUrl = shareRoute?.route
    ? `${backUrl}${shareRoute?.route}/`
    : 'havent generated a route yet';

  const { mutateAsync } = useMutation(
    'create-route',
    createShareRoute,
  );
  return (
    <section className="flex flex-col justify-start h-full">
      <section className="flex flex-row items-start space-x-3 min-h-1/3">
        <PaperCard className="w-1/5">
          <h3 className="capitalize mb-2 space-x-2 font-bold text-xl">
            <FontAwesomeIcon
              icon={faCodeBranch}
            />
            <span>get token</span>
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
            <CreateTokenForm
              onSubmit={(token) => {
                setToken(token);
                refetch();
              }}
            />
          </section>
        </PaperCard>

        <div className="w-3/5">
          {!isLoading && (
            <TableGenerator
              columns={TOKEN_COLUMNS}
              data={data.tokens}
              counter={true}
              onDelete={(id) => {
                setDeleteId(id);
                openModal();
              }}
            />
          )}
        </div>
        <PaperCard className="w-1/5">
          <h3 className="capitalize mb-2 space-x-2 font-bold text-xl">
            <FontAwesomeIcon
              icon={faShareNodes}
            />
            <span>Your share Route</span>
          </h3>
          <p className="text-sm mb-4">
            use this route with or without token
            to share your files with your friends
          </p>
          <section className="space-y-2">
            <span className="relative block">
              <TextArea
                value={shareUrl}
                disabled
                className="resize-none"
              />
              <FontAwesomeIcon
                icon={faClipboard}
                className="bg-base-200 hover:bg-base-300 rounded-lg absolute bottom-3 right-1.5 cursor-pointer py-2.5 px-3"
                onClick={() => {
                  navigator.clipboard.writeText(
                    shareUrl,
                  );
                }}
              />
            </span>
            <Button
              full
              disabled={!!shareRoute?.route}
              onClick={() => {
                mutateAsync().then(
                  refetchShareRoute,
                );
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="mr-2"
              />
              create route
            </Button>
          </section>
        </PaperCard>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setDeleteId('');
            closeModal();
          }}
        >
          <ModalFormCard title="delete token">
            <p className="text-lg">
              Are you sure you want to delete
              <span className="font-bold mx-1">
                {deleteId}
              </span>
              ?
            </p>
            <div className="flex justify-center space-x-5">
              <Button
                color="btn-error"
                className="btn-wide text-primary-content"
                onClick={() => {
                  deleteToken(deleteId).then(
                    () => {
                      refetch();
                      setDeleteId('');
                      closeModal();
                    },
                  );
                }}
              >
                delete
              </Button>
              <Button
                color="btn"
                className="btn-wide text-primary-content"
                onClick={() => {
                  setDeleteId('');
                  closeModal();
                }}
              >
                cancel
              </Button>
            </div>
          </ModalFormCard>
        </Modal>
      </section>
    </section>
  );
};

export default Settings;
