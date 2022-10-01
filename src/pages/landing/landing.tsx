import React from 'react';
import { ButtonLink } from 'components';
import { useAuthStore } from 'context';

const LandingPage = () => {
  const logged = useAuthStore(
    (state) => state.loggedin,
  );
  return (
    <main className="bg-neutral-focus text-center flex flex-col w-screen h-screen">
      <header className="text-right p-3">
        <ButtonLink
          path={logged ? '/app' : '/auth/login'}
        >
          <span className="px-4">login</span>
        </ButtonLink>
      </header>
      <div className="space-y-8 w-full flex-1 flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white">
          New
          <span className="text-primary mx-3">
            Cloud
          </span>
          Server plus distribution api for free
          for 3 months
        </h1>
      </div>
    </main>
  );
};

export default LandingPage;
