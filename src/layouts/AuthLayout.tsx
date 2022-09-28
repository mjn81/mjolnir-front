import React, { PropsWithChildren } from 'react';

export const AuthLayout = ({
  children,
}: PropsWithChildren) => {
  return (
    <main className="hero w-screen h-screen bg-base-200 flex flex-col items-center justify-center">
      {children}
    </main>
  );
};
