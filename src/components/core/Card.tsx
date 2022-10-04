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

export const PaperCard = ({
  className,
  children,
}: {
  className?: string;
} & PropsWithChildren) => {
  return (
    <section
      className={
        'shadow border p-5 rounded-lg ' +
        className
      }
    >
      {children}
    </section>
  );
};
