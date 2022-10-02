import { getDrive } from 'api';
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
  ContextMenuWrapper,
  CreateFolderForm,
  DriveFileItem,
  DriveFolderItem,
  Modal,
  ModalFormCard,
  UploadFileForm,
} from 'components';
import { ALERT_TYPES } from 'constants/index';
import { useContextMenu } from 'hooks';
import useModal from 'hooks/useModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderPlus,
  faHardDrive,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { PageLayout } from 'layouts';
import { toast } from 'react-toastify';

const Drive = () => {
  // snackbar
  const [parentId, setParentId] =
    useState<string>('');
  const [folderId, setFolderId] =
    useState<string>('');
  const [fileId, setFileId] =
    useState<string>('');
  const [deleteFileId, setFileDeleteId] =
    useState<string>('');
  const [deleteFolderId, setFolderDeleteId] =
    useState<string>('');
  const [deleteName, setDeleteName] =
    useState<string>('');

  const { data, isLoading, refetch } = useQuery(
    'getFolderDrive',
    () => getDrive(folderId),
  );
  // const { mutateAsync } = useMutation('deleteFolder', );
  const refetchCurrentDirectory = () => {
    refetch()
      .then(({ data }) => {
        setParentId(data.parentId ?? null);
      })
      .catch(() => {
        toast.error('Error');
      });
  };
  useEffect(() => {
    refetchCurrentDirectory();
  }, [folderId]);

  // modal logic

  const { isOpen, openModal, closeModal } =
    useModal();

  const {
    isOpen: isOpenDeleteFolder,
    openModal: openDeleteFolderModal,
    closeModal: closeDeleteFolderModal,
  } = useModal();
  const {
    isOpen: isOpenCreateFolder,
    openModal: openCreateFolderModal,
    closeModal: closeCreateFolderModal,
  } = useModal();

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
      Icon: faFolderPlus,
      onClick: openCreateFolderModal,
    },
  ];
  return (
    <PageLayout
      title="Drive"
      icon={faHardDrive}
      actions={
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
      }
    >
      <ContextMenuWrapper
        contextMenu={contextMenu}
        handleClose={handleClose}
        setContextMenu={setContextMenu}
        options={DriveMenuItems}
        handleContextMenu={handleContextMenu}
        className="flex-1"
      >
        <section className="w-full flex">
          {!isLoading && !!folderId && (
            <DriveFolderItem
              openModal={openDeleteFolderModal}
              id={parentId}
              setId={setFolderId}
              setDeleteId={() => {}}
              setDeleteName={() => {}}
              name="..."
              key={`back_folder_${folderId}`}
            />
          )}
          {!isLoading &&
            data?.data &&
            data.data.map(({ id, type, name }) =>
              type === 'folder' ? (
                <DriveFolderItem
                  id={id}
                  setId={setFolderId}
                  setDeleteId={setFolderDeleteId}
                  setDeleteName={setDeleteName}
                  name={name}
                  key={`folder_${id}`}
                  openModal={
                    openDeleteFolderModal
                  }
                />
              ) : (
                <DriveFileItem
                  id={id}
                  setId={setFileId}
                  setDeleteId={setFileDeleteId}
                  setDeleteName={setDeleteName}
                  name={name}
                  key={`file_${id}`}
                  openModal={
                    openDeleteFolderModal
                  }
                />
              ),
            )}
        </section>
      </ContextMenuWrapper>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
          refetch();
        }}
      >
        <ModalFormCard title="upload file">
          <UploadFileForm />
        </ModalFormCard>
      </Modal>

      <Modal
        isOpen={isOpenCreateFolder}
        onClose={() => {
          closeCreateFolderModal();
          refetchCurrentDirectory();
        }}
      >
        <ModalFormCard title="create folder">
          <CreateFolderForm parentId={folderId} />
        </ModalFormCard>
      </Modal>
      <Modal
        isOpen={isOpenDeleteFolder}
        onClose={() => {
          closeDeleteFolderModal();
        }}
      >
        <ModalFormCard title="delete folder">
          <p className="text-lg">
            Are you sure you want to delete{' '}
            <span className="font-bold">
              {deleteName}
            </span>{' '}
            folder ?
          </p>
          <div className="flex justify-center items-center space-x-5">
            <Button
              onClick={() => {
                closeDeleteFolderModal();
                refetchCurrentDirectory();
              }}
              color="btn-error"
              className="btn-wide text-primary-content"
            >
              yes
            </Button>
            <Button
              color="btn"
              onClick={() =>
                closeDeleteFolderModal()
              }
              className="btn-wide text-primary-content"
            >
              no
            </Button>
          </div>
        </ModalFormCard>
      </Modal>
    </PageLayout>
  );
};

export default Drive;
