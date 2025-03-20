import { forwardRef, memo } from 'react';

import type { ButtonProps } from '@/types/button';

import classNames from 'classnames';
import { ClipLoader } from 'react-spinners';
import styles from './Button.module.css';

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        children,
        size = 'sm',
        color = 'primary',
        type = 'button',
        variant = 'filled',
        leftIcon,
        rightIcon,
        isLoading,
        disabled,
        ...props
      },
      ref
    ) => {
      const buttonClass = classNames(
        styles.button,
        styles.basic,
        styles[size],
        styles[color],
        styles[variant],
        props.className
      );

      return (
        <button
          {...props}
          ref={ref}
          type={type}
          className={buttonClass}
          disabled={disabled || isLoading}
        >
          {leftIcon && <span>{leftIcon}</span>}
          {isLoading ? (
            <span>
              로딩중...
              <ClipLoader />
            </span>
          ) : (
            <span>{children}</span>
          )}
          {rightIcon && <span>{rightIcon}</span>}
        </button>
      );
    }
  )
);

Button.displayName = 'Button';

export default Button;
