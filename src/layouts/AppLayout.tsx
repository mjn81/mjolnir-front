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
  Inbox,
  Mail,
} from '@mui/icons-material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {
  AppBarProps as MuiAppBarProps,
} from '@mui/material/AppBar';
import { DRAWE_WINDOW_WIDTH } from 'constants/index';
import React, { PropsWithChildren } from 'react';

// export const AppLayout = ({
//   children,
// }: PropsWithChildren) => {
//   const drawer = (
//     <div>
//       <List>
//         {[
//           'Inbox',
//           'Starred',
//           'Send email',
//           'Drafts',
//         ].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map(
//           (text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ),
//         )}
//       </List>
//     </div>
//   );

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//       }}
//     >
//       <AppBar>
//         <Toolbar />
//       </AppBar>
//       <Box sx={{ display: 'flex' }}>
//         <CssBaseline />
//         <Box
//           component="nav"
//           sx={{
//             width: { sm: DRAWE_WINDOW_WIDTH },
//             flexShrink: { sm: 0 },
//           }}
//           aria-label="mailbox folders"
//         >
//           {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//           {/* <Drawer
//         container={container}
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true, // Better open performance on mobile.
//         }}
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           '& .MuiDrawer-paper': {
//             boxSizing: 'border-box',
//             width: DRAWE_WINDOW_WIDTH,
//           },
//         }}
//       >
//         {drawer}
//       </Drawer> */}
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: {
//                 xs: 'none',
//                 sm: 'block',
//               },
//               '& .MuiDrawer-paper': {
//                 boxSizing: 'border-box',
//                 width: DRAWE_WINDOW_WIDTH,
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: {
//               sm: `calc(100% - ${DRAWE_WINDOW_WIDTH}px)`,
//             },
//           }}
//         >
//           {children}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

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
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            {/* fix */}
            jdsn
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRight />
            ) : (
              <ChevronLeft />
            )}
          </IconButton>
        </DrawerHeader>

        {/* fix */}
        <Divider />
        <List>
          {[
            'Inbox',
            'Starred',
            'Send email',
            'Drafts',
          ].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: 'block' }}
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
                  {index % 2 === 0 ? (
                    <Inbox />
                  ) : (
                    <Mail />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: 'block' }}
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
                    {index % 2 === 0 ? (
                      <Inbox />
                    ) : (
                      <Mail />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ),
          )}
        </List>
      </Drawer>
      {/* fix end */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
