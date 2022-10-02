import React, { PropsWithChildren } from 'react';

export const ModalFormCard = ({
  title,
  children,
}: { title?: string } & PropsWithChildren) => {
  return (
    <div className="w-full space-y-3">
      {title && (
        <h2 className="capitalize font-semibold text-xl">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
