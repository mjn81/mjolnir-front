import {
  CreateNewFolder,
  Upload,
} from '@mui/icons-material';
import {
  Button,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { getDrive } from 'api';
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
  Link,
  useNavigate,
} from 'react-router-dom';
import {
  ContextMenu,
  ContextMenuWrapper,
  DriveFileItem,
  DriveFolderItem,
  Modal,
} from 'components';
import {
  ALERT_TYPES,
  CREATE_FOLDER_DRIVE_MODAL_ID,
  CREATE_FOLDER_FIELDS,
  CREATE_FOLDER_VALIDATOR,
} from 'constants/index';
import { useContextMenu } from 'hooks';
import useModal from 'hooks/useModal';

const Drive = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();
  const [parentId, setParentId] = useState('');
  const [id, setId] = useState('');
  const { data, isLoading, refetch } = useQuery(
    'getDrive',
    () => getDrive(id),
  );
  useEffect(() => {
    refetch()
      .then(({ data }) => {
        setParentId(data.parentId ?? null);
      })
      .catch(() => {
        enqueueSnackbar('Error', {
          variant: ALERT_TYPES.ERROR,
        });
      });
  }, [id]);
  const {
    contextMenu,
    setContextMenu,
    handleContextMenu,
    handleClose,
  } = useContextMenu();

  const { isOpen, openModal, closeModal } =
    useModal();
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
                />
              ) : (
                <DriveFileItem
                  id={id}
                  setId={setId}
                  name={name}
                  key={`file_${id}`}
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
      <Modal
        id={CREATE_FOLDER_DRIVE_MODAL_ID}
        title="new folder"
        context="create new folder here"
        open={isOpen}
        handleClose={closeModal}
        form={{
          fields: CREATE_FOLDER_FIELDS,
          initialValues: {
            name: '',
            parent: parentId,
          },
          validator: CREATE_FOLDER_VALIDATOR,
          submitBtn: <span>submit</span>,
          onSubmit: (data) => {},
        }}
      />
    </div>
  );
};

export default Drive;
