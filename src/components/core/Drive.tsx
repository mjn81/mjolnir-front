import { faCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faCircleMinus,
  faFile,
  faFileCircleMinus,
  faFolder,
  faFolderMinus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContextMenu } from 'hooks';
import React, { MouseEvent } from 'react';
import { ContextMenuWrapper } from './Context';

type DriveItemProps = {
  name: string;
  id: string;
  setId: (id: string) => void;
  setDeleteId: (id: string) => void;
  setDeleteName: (name: string) => void;
  openModal: () => void;
  [inp: string]: any;
};

export const DriveFolderItem = ({
  name,
  id,
  setId,
  setDeleteId,
  setDeleteName,
  openModal,
  ...others
}: DriveItemProps) => {
  const handleDoubleClick = () => {
    setId(id);
  };
  const {
    contextMenu,
    handleClose,
    handleContextMenu,
    setContextMenu,
  } = useContextMenu();
  const DriveMenuItems = [
    {
      label: 'Delete Folder',
      Icon: faFolderMinus,
      onClick: () => {
        setDeleteId(id);
        setDeleteName(name);
        openModal();
      },
    },
  ];
  return (
    <ContextMenuWrapper
      contextMenu={contextMenu}
      handleClose={handleClose}
      handleContextMenu={handleContextMenu}
      setContextMenu={setContextMenu}
      options={DriveMenuItems}
    >
      <div
        onDoubleClick={handleDoubleClick}
        className="space-y-1 h-32 w-32 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-base-200 rounded-xl"
        {...others}
      >
        <FontAwesomeIcon
          className="text-7xl"
          icon={faFolder}
        />
        <span className="select-none">
          {name}
        </span>
      </div>
    </ContextMenuWrapper>
  );
};
export const DriveFileItem = ({
  name,
  id,
  setDeleteId,
  setDeleteName,
  setId,
  openModal,
  ...others
}: DriveItemProps) => {
  const handleDoubleClick = () => {
    setId(id);
  };
  const {
    contextMenu,
    handleClose,
    handleContextMenu,
    setContextMenu,
  } = useContextMenu();
  const DriveMenuItems = [
    {
      label: 'Delete File',
      Icon: faFileCircleMinus,
      onClick: () => {
        setDeleteId(id);
        setDeleteName(name);
        openModal();
      },
    },
  ];
  return (
    <ContextMenuWrapper
      contextMenu={contextMenu}
      handleClose={handleClose}
      handleContextMenu={handleContextMenu}
      setContextMenu={setContextMenu}
      options={DriveMenuItems}
    >
      <div
        onDoubleClick={handleDoubleClick}
        className="h-32 w-32 space-y-2 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-base-200 rounded-xl"
        {...others}
      >
        <FontAwesomeIcon
          className="text-6xl"
          icon={faFile}
        />
        <span className="select-none">
          {name}
        </span>
      </div>
    </ContextMenuWrapper>
  );
};
