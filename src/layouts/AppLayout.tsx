import {
  Box,
  CssBaseline,
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import {
  MenuOutlined,
  ChevronLeft,
  ChevronRight,
  AccountCircle,
} from '@mui/icons-material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {
  AppBarProps as MuiAppBarProps,
} from '@mui/material/AppBar';
import {
  ALERT_TYPES,
  DRAWE_WINDOW_WIDTH,
  USER_ROLES,
  ADMIN_DRAWER_MENU,
  DRAWER_MENU,
} from 'constants/index';
import React, { PropsWithChildren } from 'react';
import { useAppSelector } from 'hooks';
import {
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { getProfile } from 'api';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';

const openedMixin = (
  theme: Theme,
): CSSObject => ({
  width: DRAWE_WINDOW_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration:
      theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (
  theme: Theme,
): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration:
      theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }),
);

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(
    ['width', 'margin'],
    {
      easing: theme.transitions.easing.sharp,
      duration:
        theme.transitions.duration.leavingScreen,
    },
  ),
  ...(open && {
    marginLeft: DRAWE_WINDOW_WIDTH,
    width: `calc(100% - ${DRAWE_WINDOW_WIDTH}px)`,
    transition: theme.transitions.create(
      ['width', 'margin'],
      {
        easing: theme.transitions.easing.sharp,
        duration:
          theme.transitions.duration
            .enteringScreen,
      },
    ),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWE_WINDOW_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const AppLayout = ({
  children,
}: PropsWithChildren) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { data } = useQuery(
    'getProfile',
    getProfile,
    {
      onError: ({ message }) => {
        enqueueSnackbar(message, {
          variant: ALERT_TYPES.ERROR,
        });
        navigation('/auth/login', {
          replace: true,
        });
      },
    },
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { user, isAuthenticated } =
    useAppSelector((state) => state.auth);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuOutlined />
          </IconButton>

          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="right"
            alignItems="center"
          >
            <AccountCircle
              sx={{
                marginRight: 1,
              }}
            />
            {isAuthenticated && (
              <Typography
                textTransform="capitalize"
                variant="h6"
                noWrap
              >
                {user.userName}
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box>
            <Typography
              component="h2"
              sx={{
                textTransform: 'capitalize',
                marginX: 1,
              }}
              noWrap
            >
              Mjolnir - FileApi
            </Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRight />
            ) : (
              <ChevronLeft />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {data?.user.role === USER_ROLES.ADMIN && (
          <List>
            {ADMIN_DRAWER_MENU.map(
              (item, index) => (
                <ListItem
                  key={`drawer_${item.name}_${index}`}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <Link
                    to={item.path}
                    className="drawer-link"
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open
                          ? 'initial'
                          : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent:
                            'center',
                        }}
                      >
                        <item.icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={{
                          opacity: open ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ),
            )}
          </List>
        )}
        {user.role === USER_ROLES.ADMIN && (
          <Divider />
        )}
        <List>
          {DRAWER_MENU.map((item, index) => (
            <ListItem
              key={`drawer_${item.name}_${index}`}
              disablePadding
              sx={{ display: 'block' }}
            >
              <Link
                to={item.path}
                className="drawer-link"
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open
                      ? 'initial'
                      : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};
