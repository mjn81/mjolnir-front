import {
  Folder,
  InsertDriveFileOutlined,
} from '@mui/icons-material';
import {
  Button,
  Typography,
} from '@mui/material';
import { FOLDER_MENU_ITEMS } from 'constants/index';
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
  [inp: string]: any;
};

export const DriveFolderItem = ({
  name,
  id,
  setId,
  ...others
}: FolderItemProps) => {
  const {
    contextMenu,
    setContextMenu,
    handleContextMenu,
    handleClose,
  } = useContextMenu();

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
      <ContextMenuWrapper
        handleContextMenu={handleContextMenu}
        handleClose={handleClose}
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

        <ContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          options={FOLDER_MENU_ITEMS}
        />
      </ContextMenuWrapper>
    </Button>
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
          fontSize: 140,
          color: '#777',
        }}
      />
      <Typography variant="h5">{name}</Typography>
    </Button>
  );
};
