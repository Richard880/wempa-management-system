import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './AuthInput.module.css';

export const AuthInput = forwardRef(({ 
  label, 
  id, 
  type = 'text', 
  error, 
  className = '', 
  ...rest 
}, ref) => {
  const inputId = id || React.useId();
  const hasError = Boolean(error);
  
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`${styles.input} ${hasError ? styles.inputError : ''}`}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          {...rest}
        />
      </div>
      {hasError && (
        <span id={`${inputId}-error`} className={styles.feedback} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

AuthInput.displayName = 'AuthInput';

AuthInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};
