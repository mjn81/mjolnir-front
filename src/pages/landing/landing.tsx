import { ButtonLink } from 'components';
import React from 'react';

const LandingPage = () => {
  return (
    <main className="bg-cblack text-center w-screen h-screen">
      <div className="space-y-8 w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl text-cwhite">
          New
          <span className="text-primary">
            Cloud
          </span>
          Server plus distribution api for free
          for 3 months
        </h1>
        <div className="space-x-5 ">
          <ButtonLink path="/auth/login">
            login
          </ButtonLink>
          <ButtonLink path="/auth/register">
            signup
          </ButtonLink>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
