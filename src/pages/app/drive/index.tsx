import { Upload } from '@mui/icons-material';
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
} from 'components';
import {
  ALERT_TYPES,
  DRIVE_MENU_ITEMS,
} from 'constants/index';
import { useContextMenu } from 'hooks';

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
          options={DRIVE_MENU_ITEMS}
        />
      </ContextMenuWrapper>
    </div>
  );
};

export default Drive;
