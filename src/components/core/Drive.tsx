import React from 'react';
import {
  faFile,
  faFileCircleMinus,
  faFileImage,
  faFilePen,
  faFolder,
  faFolderMinus,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContextMenu } from 'hooks';
import { ContextMenuWrapper } from './Context';
import { determineIcon, summerize } from 'utils';
import { DRIVE_NAME_LENGTH } from 'constants/index';

type DriveItemProps = {
  name: string;
  id: string;
  setId: (id: string) => void;
  setActionId: (id: string) => void;
  setDeleteName: (name: string) => void;
  openDeleteModal: () => void;
  openEditModal: () => void;
  moreInfo?: any;
  openInfoModal: () => void;
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
  openInfoModal,
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
          {summerize(name, DRIVE_NAME_LENGTH)}
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
  openEditModal,
  openInfoModal,
  moreInfo,
  ...others
}: DriveItemProps) => {
  const handleDoubleClick = () => {
    setId(id);
    openInfoModal();
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
    {
      label: 'Edit File',
      Icon: faFilePen,
      onClick: () => {
        setActionId(id);
        openEditModal();
      },
    },
  ];
  const { category, type } = moreInfo;
  const tagLength = category.length;
  const moreTag =
    tagLength > 4 ? `+${tagLength - 4}` : '';
  const tags = moreTag
    ? category.slice(0, 4)
    : category;

  const icon = determineIcon(type.name);

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
        <div className="relative">
          <FontAwesomeIcon
            className="text-6xl"
            icon={icon}
          />
          <div className="bg-gray-300 absolute top-0 -right-1 h-3 px-0.5 flex items-center rounded-lg">
            {tags.map(
              (
                {
                  color,
                  name,
                }: {
                  color: string;
                  name: string;
                },
                index,
              ) => (
                <div
                  key={`${name}_${color}_${index}`}
                  style={{
                    backgroundColor: color,
                  }}
                  className="h-2 w-2 rounded-full mx-[1px]"
                />
              ),
            )}
            {moreTag && (
              <div className="text-[8px] text-center mx-[1px]">
                {moreTag}
              </div>
            )}
          </div>
        </div>
        <span className="select-none">
          {summerize(name, DRIVE_NAME_LENGTH)}
        </span>
      </div>
    </ContextMenuWrapper>
  );
};
