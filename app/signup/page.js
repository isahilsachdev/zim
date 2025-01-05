'use client';

import React from 'react';

import styles from './styles.module.scss';
import SignupPage from '../modules/SignupPage/SignupPage';

const OnboardingSignup = () => {
  return (
    <div className={styles.onboardingLandingPage}>
      {/* <div className={styles.headerContainer}> */}
        {/* <OnboardingHeader /> */}
      {/* </div> */}
      <div>
        <SignupPage />
      </div>
    </div>
  );
};

export default OnboardingSignup;