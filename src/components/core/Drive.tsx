import React from 'react';
import {
  faFile,
  faFileCircleMinus,
  faFolder,
  faFolderMinus,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContextMenu } from 'hooks';
import { ContextMenuWrapper } from './Context';

type DriveItemProps = {
  name: string;
  id: string;
  setId: (id: string) => void;
  setActionId: (id: string) => void;
  setDeleteName: (name: string) => void;
  openDeleteModal: () => void;
  openEditModal: () => void;
  [inp: string]: any;
};

export const DriveFolderItem = ({
  name,
  id,
  setId,
  setActionId,
  setDeleteName,
  openDeleteModal,
  openEditModal,
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
        setActionId(id);
        setDeleteName(name);
        openDeleteModal();
      },
    },
    {
      label: 'Edit Folder',
      Icon: faPenToSquare,
      onClick: () => {
        setActionId(id);
        openEditModal();
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
  setActionId,
  setDeleteName,
  setId,
  openDeleteModal,
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
        setActionId(id);
        setDeleteName(name);
        openDeleteModal();
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
