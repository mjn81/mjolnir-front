import {
  Folder,
  InsertDriveFileOutlined,
} from '@mui/icons-material';
import {
  Button,
  Typography,
} from '@mui/material';
import React from 'react';

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
