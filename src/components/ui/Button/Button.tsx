import type { ButtonProps as BaseProps } from '@/types/button';
import { Link, type LinkProps } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { forwardRef, memo } from 'react';
import classNames from 'classnames';

import styles from './Button.module.css';

type AsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type AsAnchor = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

type AsRouterLink = BaseProps &
  Omit<LinkProps, 'className'> & {
    as: typeof Link;
  };

type ButtonProps = AsButton | AsAnchor | AsRouterLink;

const Button = memo(
  forwardRef<Element, ButtonProps>(
    (
      {
        as = 'button',
        children,
        size = 'sm',
        color = 'primary',
        variant = 'filled',
        leftIcon,
        rightIcon,
        isLoading,
        disabled,
        ...rest
      },
      ref
    ) => {
      const buttonClass = classNames(
        styles.button,
        styles.basic,
        styles[size],
        styles[color],
        styles[variant],
        rest.className
      );

      const content = (
        <>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <span className={styles.label}>{isLoading ? <ClipLoader /> : children}</span>
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </>
      );

      if (as === 'a') {
        const props = rest as AsAnchor;
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...props}
            className={buttonClass}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : props.tabIndex}
            onClick={(e) => {
              if (disabled) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              props.onClick?.(e);
            }}
          >
            {content}
          </a>
        );
      }

      if (as === Link) {
        const props = rest as AsRouterLink;
        return (
          <Link
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...props}
            className={buttonClass}
            aria-disabled={disabled || undefined}
            onClick={(e) => {
              if (disabled) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              props.onClick?.(e);
            }}
          >
            {content}
          </Link>
        );
      }

      // default: native button
      const props = rest as AsButton;
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          {...props}
          type={props.type ?? 'button'}
          disabled={disabled}
          className={buttonClass}
        >
          {content}
        </button>
      );
    }
  )
);

Button.displayName = 'Button';

export default Button;
