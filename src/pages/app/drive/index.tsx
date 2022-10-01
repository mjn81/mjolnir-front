import { getDrive, postCreateFolder } from 'api';
import { useSnackbar } from 'notistack';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  useMutation,
  useQuery,
} from 'react-query';
import {
  Button,
  ContextMenu,
  ContextMenuWrapper,
  DriveFileItem,
  DriveFolderItem,
  Modal,
  UploadFileForm,
} from 'components';
import {
  ALERT_TYPES,
  CREATE_FOLDER_VALIDATOR,
} from 'constants/index';
import { useContextMenu } from 'hooks';
import useModal from 'hooks/useModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const Drive = () => {
  // snackbar
  const { enqueueSnackbar } = useSnackbar();
  const [parentId, setParentId] =
    useState<string>('');
  const [id, setId] = useState<string>('');
  const { data, isLoading, refetch } = useQuery(
    'getDrive',
    () => getDrive(id),
  );

  const refetchCurrentDirectory = () => {
    refetch()
      .then(({ data }) => {
        setParentId(data.parentId ?? null);
      })
      .catch(() => {
        enqueueSnackbar('Error', {
          variant: ALERT_TYPES.ERROR,
        });
      });
  };
  useEffect(() => {
    refetchCurrentDirectory();
  }, [id]);
  const { mutateAsync } = useMutation(
    'createFolder',
    postCreateFolder,
    {
      onSuccess: () => {
        refetchCurrentDirectory();
      },
      onError: ({ message }) => {
        enqueueSnackbar(message, {
          variant: ALERT_TYPES.ERROR,
        });
      },
    },
  );

  // modal logic

  const { isOpen, openModal, closeModal } =
    useModal();

  const {
    isOpen: isOpenDeleteFolder,
    openModal: openDeleteFolderModal,
    closeModal: closeDeleteFolderModal,
  } = useModal();

  // add on phase 2
  const DeleteModalActions = [
    {
      label: 'Yes',
      onClick: () => {
        closeDeleteFolderModal();
      },
      color: 'error',
    },
    {
      label: 'No',
      onClick: () => {
        closeDeleteFolderModal();
      },
    },
  ];

  // context logic

  const {
    contextMenu,
    setContextMenu,
    handleContextMenu,
    handleClose,
  } = useContextMenu();

  const DriveMenuItems = [
    {
      label: 'New Folder',
      Icon: <FontAwesomeIcon icon={faUpload} />,
      onClick: openModal,
    },
  ];
  return (
    <>
      <section className="flex flex-row justify-between items-center">
        <p className="text-2xl font-medium">
          Drive
        </p>

        <Button
          onClick={() => {
            openModal();
          }}
        >
          <FontAwesomeIcon
            icon={faUpload}
            className="mr-2"
          />
          Upload
        </Button>
      </section>
      <ContextMenuWrapper
        handleContextMenu={handleContextMenu}
        handleClose={handleClose}
      >
        <section className="w-full">
          {!isLoading && !!id && (
            <DriveFolderItem
              openModal={openDeleteFolderModal}
              id={parentId}
              setId={setId}
              name="..."
              key={`back_folder_${id}`}
            />
          )}
          {!isLoading &&
            data?.data &&
            data.data.map(({ id, type, name }) =>
              type === 'folder' ? (
                <DriveFolderItem
                  id={id}
                  setId={setId}
                  name={name}
                  key={`folder_${id}`}
                  openModal={
                    openDeleteFolderModal
                  }
                />
              ) : (
                <DriveFileItem
                  id={id}
                  setId={setId}
                  name={name}
                  key={`file_${id}`}
                  openModal={
                    openDeleteFolderModal
                  }
                />
              ),
            )}
        </section>
        <ContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          options={DriveMenuItems}
        />
      </ContextMenuWrapper>

      {/* <FormModal
        id={CREATE_FOLDER_DRIVE_MODAL_ID}
        title="new folder"
        context="create new folder here"
        open={isOpen}
        handleClose={closeModal}
        form={{
          fields: CREATE_FOLDER_FIELDS,
          initialValues: {
            name: '',
            parent: id,
          },
          validator: CREATE_FOLDER_VALIDATOR,
          submitBtn: <span>submit</span>,
          submit: (data, { setSubmitting }) => {
            mutateAsync(data).finally(() => {
              setSubmitting(false);
              closeModal();
            });
          },
        }}
      /> */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
          refetch();
        }}
      >
        <div className="w-full space-y-3">
          <h2 className="capitalize font-semibold text-xl">
            upload file
          </h2>
          <UploadFileForm />
        </div>
      </Modal>
      {/* <ConfirmModal
        open={isOpenDeleteFolder}
        handleClose={closeDeleteFolderModal}
        title="delete folder"
        context="are you sure you want to delete this folder?"
        actions={DeleteModalActions}
        id={DELETE_FOLDER_DRIVE_MODAL_ID}
      /> */}
    </>
  );
};

export default Drive;
