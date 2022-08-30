import {
  Delete,
  Folder,
  InsertDriveFileOutlined,
} from '@mui/icons-material';
import {
  Button,
  Typography,
} from '@mui/material';
import { useContextMenu } from 'hooks';
import React from 'react';
import {
  ContextMenu,
  ContextMenuWrapper,
} from './Context';

type FolderItemProps = {
  name: string;
  id: string;
  setId: (id: string) => void;
  openModal: () => void;
  [inp: string]: any;
};

export const DriveFolderItem = ({
  name,
  id,
  setId,
  openModal,
  ...others
}: FolderItemProps) => {
  const handleDoubleClick = () => {
    setId(id);
  };
  const {
    contextMenu,
    handleClose,
    handleContextMenu,
    setContextMenu,
  } = useContextMenu();
  const DriveMenuItems = React.useMemo(
    () => [
      {
        label: 'Delete Folder',
        Icon: Delete,
        onClick: openModal,
      },
    ],
    [],
  );
  return (
    <ContextMenuWrapper
      handleClose={handleClose}
      handleContextMenu={handleContextMenu}
    >
      <Button
        onDoubleClick={handleDoubleClick}
        {...others}
        TouchRippleProps={{
          classes: {
            ripple: 'drive-ripple',
          },
        }}
        sx={{
          ':hover': {
            backgroundColor: '#f5f5f5',
          },
          width: '100%',
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: 3,
        }}
      >
        <Folder
          sx={{
            fontSize: 100,
            color: '#777',
          }}
        />
        <Typography
          variant="h6"
          textTransform="none"
          color="#333"
          fontSize={14}
        >
          {name}
        </Typography>
      </Button>
      <ContextMenu
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        options={DriveMenuItems}
      />
    </ContextMenuWrapper>
  );
};
export const DriveFileItem = ({
  name,
  id,
  setId,
  ...others
}: FolderItemProps) => {
  const handleDoubleClick = () => {
    setId(id);
  };

  return (
    <Button
      onDoubleClick={handleDoubleClick}
      {...others}
      TouchRippleProps={{
        classes: {
          ripple: 'drive-ripple',
        },
      }}
      sx={{
        ':hover': {
          backgroundColor: '#f5f5f5',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 3,
      }}
    >
      <InsertDriveFileOutlined
        sx={{
          fontSize: 100,
          color: '#777',
        }}
      />
      <Typography
        variant="h6"
        textTransform="none"
        color="#333"
        fontSize={14}
      >
        {name}
      </Typography>
    </Button>
  );
};
