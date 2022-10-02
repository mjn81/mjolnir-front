import {
  faFile,
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
  openModal,
  setDeleteName,
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

  const handleContext = (e: MouseEvent) => {
    handleContextMenu(e);
    setDeleteId(id);
    setDeleteName(name);
  };
  const DriveMenuItems = [
    {
      label: 'Delete Folder',
      Icon: faFolderMinus,
      onClick: openModal,
    },
  ];
  return (
    <ContextMenuWrapper
      contextMenu={contextMenu}
      handleClose={handleClose}
      handleContextMenu={handleContext}
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
  openModal,
  setId,
  ...others
}: DriveItemProps) => {
  const handleDoubleClick = () => {
    setId(id);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="h-32 w-32 space-y-2 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-base-200 rounded-xl"
      {...others}
    >
      <FontAwesomeIcon
        className="text-6xl"
        icon={faFile}
      />
      <span className="select-none">{name}</span>
    </div>
  );
};
