import React from 'react';
import styles from './OnboardingFormLayout.module.scss';

const OnboardingFormLayout = ({children}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        {children}
      </div>
    </div>
  )
}

export default OnboardingFormLayout