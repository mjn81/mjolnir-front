import {
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import React from 'react';

export type ContextMenuType = {
  mouseX: number;
  mouseY: number;
} | null;

type ContextMenuProps = {
  contextMenu: ContextMenuType;
  setContextMenu: (
    contextMenu: ContextMenuType,
  ) => void;
  options: {
    label: string;
    Icon?: React.ReactNode;
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

  return <div></div>;
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
    <div
      onContextMenu={handleContextMenu}
      onMouseDownCapture={(e) => {
        if (e.button === 2) handleClose();
      }}
    >
      {children}
    </div>
  );
};
