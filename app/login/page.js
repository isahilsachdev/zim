'use client';

import React from 'react';

import styles from './styles.module.scss';
import LoginPage from '../modules/LoginPage/LoginPage';

const OnboardingLogin = () => {
  return (
    <div className={styles.onboardingLandingPage}>
      {/* <div className={styles.headerContainer}> */}
        {/* <OnboardingHeader /> */}
      {/* </div> */}
      <div>
        <LoginPage />
      </div>
    </div>
  );
};

export default OnboardingLogin;