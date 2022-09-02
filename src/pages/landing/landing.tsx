import React from 'react';
import { Link } from 'react-router-dom';
import 'styles/landing.css';

const LandingPage = () => {
  // reshape to mui best practice later ...
  return (
    <main className="main-page">
      <div className="content">
        <h1 className="title">
          New
          <span className="w-blue">Cloud</span>
          Server plus distribution api for free
          for 3 months
        </h1>
        <div className="holder">
          <Link className="btn" to="/auth/login">
            login
          </Link>
          <Link
            className="btn"
            to="/auth/register"
          >
            signup
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
