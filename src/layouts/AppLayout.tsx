import {
  ALERT_TYPES,
  USER_ROLES,
  ADMIN_DRAWER_MENU,
  DRAWER_MENU,
} from 'constants/index';
import React, { useState } from 'react';
import {
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

import { getProfile } from 'api';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { useAuthStore } from 'context';
import { useCurrentPath } from 'hooks';

const nav_variants = {
  open: {
    width: '150px',
  },
  closed: {
    width: '80px',
  },
};
const text_variants = {
  open: {
    opacity: 1,
    display: 'block',
    width: 'fit-content',
    transition: {
      opacity: {
        delay: 0.1,
      },
    },
  },
  closed: {
    opacity: 0,
    width: '0',
    display: 'none',
    transition: {
      opacity: {
        duration: 0.05,
      },
      type: 'tween',
    },
  },
};
const button_variants = {
  open: {
    rotate: -180,
  },
  close: {
    rotate: 0,
  },
};
const button_wrapper_variants = {
  open: {
    width: '100%',
  },
};

export const AppLayout = () => {
  const logout = useAuthStore(
    (state) => state.logout,
  );
  const user = useAuthStore(
    (state) => state.user,
  );
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();
  const [open, setOpen] = React.useState(false);
  const currentPath = useCurrentPath();
  const [isAdmin, setIsAdmin] =
    useState<boolean>(false);
  const { data } = useQuery(
    'getProfile',
    getProfile,
    {
      onSuccess: (data) => {
        setIsAdmin(
          data.role === USER_ROLES.ADMIN,
        );
      },
      onError: ({ message }) => {
        logout();
        enqueueSnackbar(message, {
          variant: ALERT_TYPES.ERROR,
        });
        navigation('/auth/login', {
          replace: true,
        });
      },
    },
  );

  const profile =
    data?.profile[0]?.path ??
    `https://ui-avatars.com/api/?background=a274ed&color=ffffff&name=${user.username}`;

  const handleDrawerToggle = () => {
    setOpen((state) => !state);
  };

  return (
    <main className="bg-base-100 flex">
      <motion.nav
        animate={open ? 'open' : 'closed'}
        variants={nav_variants}
        className="shadow-xl bg-base-100 h-screen"
      >
        <section className="flex flex-col justify-between items-center h-full p-3">
          <Link
            to="profile"
            className="avatar flex items-center justify-center space-x-2 cursor-pointer"
          >
            <div className="w-11 rounded-full border-2 border-primary ">
              <img src={profile} />
            </div>
            <motion.p
              animate={open ? 'open' : 'closed'}
              variants={text_variants}
              className="capitalize"
            >
              {user.username}
            </motion.p>
          </Link>
          <ul className="flex flex-col justify-center items-stretch space-y-1">
            {isAdmin &&
              ADMIN_DRAWER_MENU.map(
                (item, index) => (
                  <Link
                    to={item.path}
                    key={`admin_drawer_item_${item.path}_${index}`}
                  >
                    <li
                      className={
                        (open
                          ? 'justify-start '
                          : 'justify-center ') +
                        (currentPath === item.path
                          ? 'item-active '
                          : '') +
                        'outline-none w-full whitespace-nowrap btn bg-transparent border-none hover:bg-base-200 p-2 space-x-2'
                      }
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-left text-xl text-base-content"
                      />

                      <motion.p
                        animate={
                          open ? 'open' : 'closed'
                        }
                        variants={text_variants}
                        className="font-light text-xs text-base-content"
                      >
                        {item.name}
                      </motion.p>
                    </li>
                  </Link>
                ),
              )}
            {isAdmin && (
              <span className="divider" />
            )}
            {DRAWER_MENU.map((item, index) => (
              <Link
                to={item.path}
                key={`user_drawer_item_${item.path}_${index}`}
              >
                <li
                  className={
                    (open
                      ? 'justify-start '
                      : 'justify-center ') +
                    (currentPath === item.path
                      ? 'item-active '
                      : '') +
                    'w-full whitespace-nowrap btn bg-transparent  border-none hover:bg-base-200 p-3 space-x-2'
                  }
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-left text-xl text-base-content"
                  />

                  <motion.p
                    animate={
                      open ? 'open' : 'closed'
                    }
                    variants={text_variants}
                    className="font-light text-xs text-base-content"
                  >
                    {item.name}
                  </motion.p>
                </li>
              </Link>
            ))}
          </ul>
          <motion.div
            variants={button_wrapper_variants}
            animate={open && 'open'}
            onClick={handleDrawerToggle}
            className="btn bg-transparent border-none text-base-content hover:bg-base-200"
          >
            <motion.div
              variants={button_variants}
              animate={open ? 'open' : 'close'}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-lg "
              />
            </motion.div>
          </motion.div>
        </section>
      </motion.nav>
      <section className="flex-1 p-6 ">
        <Outlet />
      </section>
    </main>
  );
};
