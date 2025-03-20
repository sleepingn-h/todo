import type { BaseInputProps } from '@/types/form';
import { forwardRef, memo } from 'react';
import classNames from 'classnames';

import Helper from './Helper';
import styles from './form.module.css';

type BaseInputComponent = typeof BaseInput & { Helper: typeof Helper };

const BaseInput = memo(
  forwardRef<HTMLInputElement, BaseInputProps>(
    (
      {
        id,
        name,
        size = 'md',
        variant = 'filled',
        validationState = 'default',
        InputWidth = 'full',
        icon,
        iconDir = 'left',
        label,
        labelHidden = false,
        required = false,
        className,
        containerClassName,
        helper,
        disabled,
        ...props
      },
      ref
    ) => {
      const wrapperClassName = classNames(styles.wrapper, styles[InputWidth], containerClassName);
      const labelClassName = classNames(
        styles.label,
        required && styles.required,
        labelHidden && styles.hidden
      );
      const inputClassName = classNames(
        styles.input,
        icon && iconDir === 'left' && styles['icon-left'],
        icon && iconDir === 'right' && styles['icon-right'],
        styles[size],
        styles[validationState],
        styles[variant],
        disabled && styles.disabled,
        className
      );
      const iconClassName = classNames(
        styles.icon,
        icon && iconDir === 'left' && styles.left,
        icon && iconDir === 'right' && styles.right
      );

      return (
        <div className={wrapperClassName}>
          <label htmlFor={id} className={labelClassName}>
            {label}
            {required && <span>*</span>}
          </label>

          <div className={styles.inputWrapper}>
            {icon && iconDir === 'left' && <span className={iconClassName}>{icon}</span>}
            <input
              id={id}
              name={name ?? id}
              ref={ref}
              disabled={disabled}
              className={inputClassName}
              {...props}
            />
            {icon && iconDir === 'right' && <span className={iconClassName}>{icon}</span>}
            {helper && <Helper helper={helper} />}
          </div>
        </div>
      );
    }
  )
);

BaseInput.displayName = 'BaseInput';

Object.assign(BaseInput, { Helper });

export default BaseInput as BaseInputComponent;
