import React, { PropsWithChildren } from 'react';

export const AppLayout = ({
  children,
}: PropsWithChildren) => {
  return <div className="App">{children}</div>;
};
