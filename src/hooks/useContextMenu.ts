import React from 'react';

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] =
    React.useState<{
      mouseX: number;
      mouseY: number;
    } | null>(null);

  const handleContextMenu = (
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };
  return {
    contextMenu,
    setContextMenu,
    handleContextMenu,
    handleClose,
  };
};
