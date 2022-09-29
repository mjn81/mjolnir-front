import {
  faBarsProgress,
  faBoxOpen,
  faEnvelope,
  faGear,
  faHouse,
  faLayerGroup,
  faTags,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';

export const DRAWER_MENU = [
  {
    name: 'Home',
    icon: faHouse,
    path: '/app',
  },
  {
    name: 'Drive',
    icon: faBoxOpen,
    path: '/app/drive',
  },
  {
    name: 'Categories',
    icon: faTags,
    path: '/app/categories',
  },
  {
    name: 'Settings',
    icon: faGear,
    path: '/app/settings',
  },
];

export const ADMIN_DRAWER_MENU = [
  {
    name: 'panel',
    icon: faBarsProgress,
    path: '/admin',
  },
  {
    name: 'Users',
    icon: faUserGear,
    path: '/admin/users',
  },
];
