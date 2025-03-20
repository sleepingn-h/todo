import type { ButtonProps } from '@/types/button';
import { forwardRef, memo } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

type ButtonIconProps = Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> & {
  icon: React.ReactNode;
  label: string; // aria-label용
};

const ButtonIcon = memo(
  forwardRef<HTMLButtonElement, ButtonIconProps>(
    ({ size = 'icon', type = 'button', icon, label, disabled, className, ...props }, ref) => {
      const buttonClass = classNames(styles.button, styles[size], className);

      return (
        <button
          {...props}
          ref={ref}
          type={type}
          className={buttonClass}
          aria-label={label}
          disabled={disabled}
        >
          {icon}
        </button>
      );
    }
  )
);

ButtonIcon.displayName = 'ButtonIcon';

export default ButtonIcon;
