import {
  ALERT_TYPES,
  DRAWE_WINDOW_WIDTH,
  USER_ROLES,
  ADMIN_DRAWER_MENU,
  DRAWER_MENU,
} from 'constants/index';
import React, { PropsWithChildren } from 'react';
import {
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { getProfile } from 'api';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';

export const AppLayout = ({
  children,
}: PropsWithChildren) => {
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

  return (
    <main className="h-screen w-screen"></main>
  );
};

//  <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: 'none' }),
//             }}
//           >
//             <MenuOutlined />
//           </IconButton>

//           <Box
//             width="100%"
//             display="flex"
//             flexDirection="row"
//             justifyContent="right"
//             alignItems="center"
//           >
//             <AccountCircle
//               sx={{
//                 marginRight: 1,
//               }}
//             />
//             {isAuthenticated && (
//               <Typography
//                 textTransform="capitalize"
//                 variant="h6"
//                 noWrap
//               >
//                 {user.userName}
//               </Typography>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <Box>
//             <Typography
//               component="h2"
//               sx={{
//                 textTransform: 'capitalize',
//                 marginX: 1,
//               }}
//               noWrap
//             >
//               Mjolnir - FileApi
//             </Typography>
//           </Box>

//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'rtl' ? (
//               <ChevronRight />
//             ) : (
//               <ChevronLeft />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         {data?.user.role === USER_ROLES.ADMIN && (
//           <List>
//             {ADMIN_DRAWER_MENU.map(
//               (item, index) => (
//                 <ListItem
//                   key={`drawer_${item.name}_${index}`}
//                   disablePadding
//                   sx={{ display: 'block' }}
//                 >
//                   <Link
//                     to={item.path}
//                     className="drawer-link"
//                   >
//                     <ListItemButton
//                       sx={{
//                         minHeight: 48,
//                         justifyContent: open
//                           ? 'initial'
//                           : 'center',
//                         px: 2.5,
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           minWidth: 0,
//                           mr: open ? 3 : 'auto',
//                           justifyContent:
//                             'center',
//                         }}
//                       >
//                         <item.icon />
//                       </ListItemIcon>
//                       <ListItemText
//                         primary={item.name}
//                         sx={{
//                           opacity: open ? 1 : 0,
//                         }}
//                       />
//                     </ListItemButton>
//                   </Link>
//                 </ListItem>
//               ),
//             )}
//           </List>
//         )}
//         {user &&
//           user.role === USER_ROLES.ADMIN && (
//             <Divider />
//           )}
//         <List>
//           {DRAWER_MENU.map((item, index) => (
//             <ListItem
//               key={`drawer_${item.name}_${index}`}
//               disablePadding
//               sx={{ display: 'block' }}
//             >
//               <Link
//                 to={item.path}
//                 className="drawer-link"
//               >
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open
//                       ? 'initial'
//                       : 'center',
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : 'auto',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <item.icon />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={item.name}
//                     sx={{ opacity: open ? 1 : 0 }}
//                   />
//                 </ListItemButton>
//               </Link>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, p: 3 }}
//       >
//         <DrawerHeader />
//         <Outlet />
//       </Box>
//     </Box>
