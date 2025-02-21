'use client';

import React from 'react';
import PropTypes from 'prop-types';

import styles from './Typography.module.scss';

const Typography = ({ color, textType, text, align, children }) => {
  const style = {
    color: color || '#FFFFFF',
    textAlign: align || 'left',
    whiteSpace: text?.length < 12 ? 'nowrap' : ''
  };

  return (
    <span className={styles[textType]} style={style}>
      {text}
      {children}
    </span>
  );
};

Typography.propTypes = {
  color: PropTypes.string,
  textType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Typography;
