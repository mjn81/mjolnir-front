import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchInput } from 'components';
import React, { PropsWithChildren } from 'react';

export const PageLayout = ({
  icon,
  title,
  actions,
  children,
}: {
  icon?: IconDefinition;
  title: string;
  actions?: React.ReactNode;
} & PropsWithChildren) => {
  return (
    <div className="flex-grow flex flex-col">
      <header className="space-y-3 mb-4">
        <h3 className="text-2xl font-medium space-x-2">
          {icon && (
            <FontAwesomeIcon icon={icon} />
          )}
          <span>{title}</span>
        </h3>
        <section className="flex items-center justify-between">
          <SearchInput />
          {actions}
        </section>
      </header>
      {children}
    </div>
  );
};
