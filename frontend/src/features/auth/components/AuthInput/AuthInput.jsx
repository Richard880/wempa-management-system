import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './AuthInput.module.css';

export const AuthInput = forwardRef(({ 
  label, 
  id, 
  type = 'text', 
  error, 
  icon, // 	🏼 ADDED: Structural prop hook to inject vector icons seamlessly
  className = '', 
  ...rest 
}, ref) => {
  const inputId = id || React.useId();
  const hasError = Boolean(error);
  
  return (
    <div className={`${styles.container} ${className}`}>
      {/* Retain standard semantic labels for voiceover screens but hide if empty */}
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      
      <div className={`${styles.inputWrapper} ${icon ? styles.hasIcon : ''}`}>
        {/* 	🏼 DYNAMIC ICON TRACK ENVELOPE MODULE */}
        {icon && (
          <i className={`bi bi-${icon} ${styles.inputIcon}`} aria-hidden="true" />
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`${styles.input} ${hasError ? styles.inputError : ''} ${icon ? styles.padLeft : ''}`}
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
  icon: PropTypes.string, // Prop validation hook mapping string rules
  className: PropTypes.string,
};
