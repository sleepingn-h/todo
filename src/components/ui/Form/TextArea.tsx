import type { TextAreaProps } from '@/types/form';
import classNames from 'classnames';
import { forwardRef, memo } from 'react';
import Helper from './Helper';
import styles from './form.module.css';

const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
      {
        id,
        name,
        label,
        labelHidden = false,
        required = false,
        variant = 'filled',
        validationState = 'default',
        InputWidth = 'full',
        className,
        containerClassName,
        disabled,
        maxLength,
        rows = 4,
        helper,
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
        styles[validationState],
        styles[variant],
        disabled && styles.disabled,
        className
      );

      return (
        <div className={wrapperClassName}>
          <label htmlFor={id} className={labelClassName}>
            {label}
            {required && <span>*</span>}
          </label>

          <textarea
            id={id}
            name={name ?? id}
            ref={ref}
            rows={rows}
            disabled={disabled}
            maxLength={maxLength}
            className={inputClassName}
            {...props}
          />
          {helper && <Helper helper={helper} />}
        </div>
      );
    }
  )
);

TextArea.displayName = 'TextArea';

export default TextArea;
