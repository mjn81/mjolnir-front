import {
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type ContextMenuProps = {
  contextMenu: {
    mouseX: number;
    mouseY: number;
  } | null;
  setContextMenu: (
    contextMenu: {
      mouseX: number;
      mouseY: number;
    } | null,
  ) => void;
  options: {
    label: string;
    Icon?: React.ElementType;
    onClick: () => void;
  }[];
};

export const ContextMenu = ({
  contextMenu,
  setContextMenu,
  options,
}: ContextMenuProps) => {
  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? {
              top: contextMenu.mouseY,
              left: contextMenu.mouseX,
            }
          : undefined
      }
    >
      {options.map(
        ({ label, Icon, onClick }, index) => (
          <MenuItem
            onClick={() => {
              onClick();
              handleClose();
            }}
            key={`ctx_menu_${index}`}
          >
            {Icon && (
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
            )}
            {label}
          </MenuItem>
        ),
      )}
    </Menu>
  );
};

type ContextProps = {
  children: React.ReactNode;
  handleContextMenu: (
    event: React.MouseEvent,
  ) => void;
  handleClose: () => void;
};

export const ContextMenuWrapper = ({
  children,
  handleContextMenu,
  handleClose,
}: ContextProps) => {
  return (
    <Box
      onContextMenu={handleContextMenu}
      onMouseDownCapture={(e) => {
        if (e.button === 2) handleClose();
      }}
    >
      {children}
    </Box>
  );
};
