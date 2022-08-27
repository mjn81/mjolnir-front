import {
  CreateNewFolder,
  Delete,
  DriveFileRenameOutline,
} from '@mui/icons-material';

export const DRIVE_MENU_ITEMS = [
  {
    label: 'New Folder',
    Icon: CreateNewFolder,
    onClick: () => {
      console.log('New Folder');
    },
  },
];

export const FOLDER_MENU_ITEMS = [
  {
    label: 'Delete Folder',
    Icon: Delete,
    onClick: () => {
      console.log('Delete Folder');
    },
  },
  {
    label: 'Rename Folder',
    Icon: DriveFileRenameOutline,
    onClick: () => {
      console.log('Rename folder');
    },
  },
];
