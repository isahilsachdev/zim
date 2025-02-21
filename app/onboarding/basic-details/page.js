'use client';

import React from 'react';

import styles from './styles.module.scss';
import BasicDetailsPage from '@/app/modules/Onboarding/BasicDetails/BasicDetails';

const OnboardingBasicDetails = () => {
  return (
    <div className={styles.onboardingLandingPage}>
      <div>
        <BasicDetailsPage />
      </div>
    </div>
  );
};

export default OnboardingBasicDetails;