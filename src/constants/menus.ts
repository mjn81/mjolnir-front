import {
  Apps,
  DriveFolderUpload,
  Category,
  Dashboard,
  ManageAccounts,
  PermDataSetting,
  Folder,
  Settings,
} from '@mui/icons-material';

export const DRAWER_MENU = [
  {
    name: 'Home',
    icon: Apps,
    path: '/app',
  },
  {
    name: 'Drive',
    icon: Folder,
    path: '/app/drive',
  },
  {
    name: 'Categories',
    icon: Category,
    path: '/app/categories',
  },
  {
    name: 'Settings',
    icon: Settings,
    path: '/app/settings',
  }
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
