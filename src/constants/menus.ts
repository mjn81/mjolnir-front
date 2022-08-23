import {
  Apps,
  DriveFolderUpload,
  Category,
  Dashboard,
  ManageAccounts,
  PermDataSetting,
} from '@mui/icons-material';

export const DRAWER_MENU = [
  {
    name: 'Home',
    icon: Apps,
    path: '/app',
  },
  {
    name: 'Categories',
    icon: Category,
    path: '/app/categories',
  },
  {
    name: 'Files',
    icon: DriveFolderUpload,
    path: '/app/files',
  },
];

export const ADMIN_DRAWER_MENU = [
  {
    name: 'Admin',
    icon: Dashboard,
    path: '/admin',
  },
  {
    name: 'Categories',
    icon: PermDataSetting,
    path: '/admin/categories',
  },
  {
    name: 'Users',
    icon: ManageAccounts,
    path: '/admin/users',
  },

];
