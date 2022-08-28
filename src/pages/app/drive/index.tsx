import {
  CreateNewFolder,
  Upload,
} from '@mui/icons-material';
import {
  Button,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
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
import { Link } from 'react-router-dom';
import {
  ConfirmModal,
  ContextMenu,
  ContextMenuWrapper,
  DriveFileItem,
  DriveFolderItem,
  FormModal,
} from 'components';
import {
  ALERT_TYPES,
  CREATE_FOLDER_DRIVE_MODAL_ID,
  CREATE_FOLDER_FIELDS,
  CREATE_FOLDER_VALIDATOR,
  DELETE_FOLDER_DRIVE_MODAL_ID,
} from 'constants/index';
import { useContextMenu } from 'hooks';
import useModal from 'hooks/useModal';

const Drive = () => {
  // snackbar
  const { enqueueSnackbar } = useSnackbar();

  // fetching directory logic

  const [parentId, setParentId] = useState('');
  const [id, setId] = useState('');
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
  const DeleteModalActions = React.useMemo(
    () => [
      {
        label: 'Yes',
        onClick: () => {
          closeDeleteFolderModal();
        },
      },
      {
        label: 'No',
        onClick: () => {
          closeDeleteFolderModal();
        },
      },
    ],
    [],
  );

  // context logic

  const {
    contextMenu,
    setContextMenu,
    handleContextMenu,
    handleClose,
  } = useContextMenu();

  const DriveMenuItems = React.useMemo(
    () => [
      {
        label: 'New Folder',
        Icon: CreateNewFolder,
        onClick: openModal,
      },
    ],
    [],
  );

  // improve performance
  return (
    <div>
      <Box
        display="flex"
        marginBottom={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" component="p">
          Drive
        </Typography>
        <Link to="upload">
          <Button
            variant="contained"
            startIcon={<Upload />}
          >
            <Typography
              variant="subtitle1"
              textTransform="capitalize"
            >
              Upload File
            </Typography>
          </Button>
        </Link>
      </Box>
      <ContextMenuWrapper
        handleContextMenu={handleContextMenu}
        handleClose={handleClose}
      >
        <Box
          component="section"
          className="grid drive-full-height"
        >
          {!isLoading && id && (
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
        </Box>
        <ContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          options={DriveMenuItems}
        />
      </ContextMenuWrapper>

      <FormModal
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
      />

      <ConfirmModal
        open={isOpenDeleteFolder}
        handleClose={closeDeleteFolderModal}
        title="delete folder"
        context="are you sure you want to delete this folder?"
        actions={DeleteModalActions}
        id={DELETE_FOLDER_DRIVE_MODAL_ID}
      />
    </div>
  );
};

export default Drive;
