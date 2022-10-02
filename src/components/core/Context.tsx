import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Portal } from 'react-portal';
import {
  SimpleMenu,
  SimpleMenuItem,
} from './Menu';

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
    Icon?: IconDefinition;
    onClick: () => void;
  }[];
  handleClose: () => void;
};

export const ContextMenu = ({
  contextMenu,
  setContextMenu,
  handleClose,
  options,
}: ContextMenuProps) => {
  return (
    <Portal
      node={
        document &&
        document.getElementById('context')
      }
    >
      <SimpleMenu
        isOpen={!!contextMenu}
        style={{
          top: contextMenu?.mouseY,
          left: contextMenu?.mouseX,
        }}
      >
        {options.map((option, index) => (
          <SimpleMenuItem
            isOpen={!!contextMenu}
            index={index}
            key={`ctx_menu_${option.label}_${index}`}
            onClick={(e) => {
              e?.stopPropagation();
              option.onClick();
              handleClose();
            }}
          >
            {!!option.Icon && (
              <FontAwesomeIcon
                icon={option.Icon}
                className="mr-2"
              />
            )}
            {option.label}
          </SimpleMenuItem>
        ))}
      </SimpleMenu>
    </Portal>
  );
};

type ContextProps = {
  children: React.ReactNode;
  handleContextMenu: (
    event: React.MouseEvent,
  ) => void;

  className?: string;
} & ContextMenuProps;

export const ContextMenuWrapper = ({
  children,
  setContextMenu,
  handleContextMenu,
  handleClose,
  contextMenu,
  options,
  className,
}: ContextProps) => {
  return (
    <div
      onContextMenu={(e) => {
        handleContextMenu(e);
        if (!contextMenu) {
          document.addEventListener(
            'click',
            () => {
              handleClose();
            },
            {
              once: true,
            },
          );
        }
      }}
      className={'relative ' + className}
    >
      {children}
      <ContextMenu
        handleClose={handleClose}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        options={options}
      />
    </div>
  );
};
