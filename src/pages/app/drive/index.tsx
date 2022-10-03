import { deleteFile, getDrive } from 'api';
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
  EditFolderForm,
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
  const [actionFileId, setActionFileId] =
    useState<string>('');
  const [actionFolderId, setActionFolderId] =
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
    isOpen: isOpenDelete,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const {
    isOpen: isOpenCreateFolder,
    openModal: openCreateFolderModal,
    closeModal: closeCreateFolderModal,
  } = useModal();
  const {
    isOpen: isOpenEditFolder,
    openModal: openEditFolderModal,
    closeModal: closeEditFolderModal,
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
              id={parentId}
              setId={setFolderId}
              setActionId={() => {}}
              setDeleteName={() => {}}
              context={{
                contextMenu: null,
                handleClose: () => {},
                handleContextMenu: () => {},
                setContextMenu: () => {},
              }}
              openDeleteModal={() => {}}
              openEditModal={() => {}}
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
                  setActionId={setActionFolderId}
                  setDeleteName={setDeleteName}
                  name={name}
                  key={`folder_${id}`}
                  openDeleteModal={
                    openDeleteModal
                  }
                  openEditModal={
                    openEditFolderModal
                  }
                />
              ) : (
                <DriveFileItem
                  id={id}
                  setId={setFileId}
                  setActionId={setActionFileId}
                  setDeleteName={setDeleteName}
                  name={name}
                  key={`file_${id}`}
                  openDeleteModal={
                    openDeleteModal
                  }
                  openEditModal={
                    openEditFolderModal
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
          <UploadFileForm folderId={folderId} />
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
        isOpen={isOpenDelete}
        onClose={() => {
          closeDeleteModal();
        }}
      >
        <ModalFormCard title="delete folder">
          <p className="text-lg">
            Are you sure you want to delete{' '}
            <span className="font-bold">
              {deleteName}
            </span>{' '}
            {actionFolderId
              ? 'folder'
              : actionFileId
              ? 'file'
              : ''}{' '}
            ?
          </p>
          <div className="flex justify-center items-center space-x-5">
            <Button
              onClick={() => {
                if (actionFolderId) {
                  setActionFolderId('');
                } else if (actionFileId) {
                  deleteFile(actionFileId).then(
                    refetchCurrentDirectory,
                  );
                  setActionFileId('');
                }
                closeDeleteModal();
              }}
              color="btn-error"
              className="btn-wide text-primary-content"
            >
              yes
            </Button>
            <Button
              color="btn"
              onClick={() => {
                closeDeleteModal();
                if (actionFolderId) {
                  setActionFolderId('');
                } else if (actionFileId) {
                  setActionFileId('');
                }
              }}
              className="btn-wide text-primary-content"
            >
              no
            </Button>
          </div>
        </ModalFormCard>
      </Modal>

      <Modal
        isOpen={isOpenEditFolder}
        onClose={() => {
          setActionFolderId('');
          refetchCurrentDirectory();
          closeEditFolderModal();
        }}
      >
        <ModalFormCard title="edit folder">
          <EditFolderForm id={actionFolderId} />
        </ModalFormCard>
      </Modal>
    </PageLayout>
  );
};

export default Drive;
