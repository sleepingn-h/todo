import type { DropdownProps } from '@/types/dropdown';
import React, { cloneElement, forwardRef, memo, useMemo } from 'react';
import classNames from 'classnames';

import DropdownProvider, { useDropdownContext } from './DropdownProvider';

import styles from './Dropdown.module.css';

const Dropdown = <T,>({
  type = 'combo',
  aria,
  value,
  onChange,
  children,
}: { children: React.ReactNode } & DropdownProps<T>) => {
  const arias = useMemo(() => {
    if (!aria) return;

    return {
      id: aria.id,
      controls: aria.controls,
      expanded: aria.expanded ?? false,
      haspopup: aria.haspopup ?? 'listbox',
      labelledby: `${aria.id}-label`,
      role: aria.role ?? 'button',
    };
  }, [aria]);

  return (
    <DropdownProvider value={value} onChange={onChange} type={type} aria={arias}>
      <DropdownConent>{children}</DropdownConent>
    </DropdownProvider>
  );
};

const DropdownConent = ({ children }: { children: React.ReactNode }) => {
  const { dropdownRef } = useDropdownContext();

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      {children}
    </div>
  );
};

type TitleProps = {
  children: React.ReactNode;
  variant?: string;
  as?: React.ElementType;
  hidden?: boolean;
};

const Header = memo(({ as: Component = 'h1', hidden = false, children, ...props }: TitleProps) => {
  const className = classNames(styles.title, hidden && styles.hidden);

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
});

type TriggerProps = {
  as?: React.ReactElement | React.ElementType | React.ReactNode;
};
const Trigger = forwardRef<HTMLButtonElement, TriggerProps & React.HTMLAttributes<HTMLElement>>(
  ({ children, as: Component, ...props }, ref) => {
    const { isOpen, toggle, aria, triggerRef } = useDropdownContext();

    if (!Component) return null;
    const isElementType = typeof Component === 'string' || typeof Component === 'function';

    return isElementType ? (
      <Component
        className={styles.trigger}
        onClick={toggle}
        ref={(node: HTMLButtonElement | null) => {
          triggerRef.current = node;
          if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        aria-expanded={isOpen}
        aria-controls={aria?.controls}
        aria-haspopup={aria?.haspopup}
        aria-labelledby={aria?.labelledby}
        role={aria?.role}
        tabIndex={0}
        {...props}
      >
        {children}
      </Component>
    ) : (
      cloneElement(Component as React.ReactElement, {
        className: styles.trigger,
        onClick: toggle,
        'aria-expanded': isOpen,
        'aria-controls': aria?.controls,
        'aria-haspopup': aria?.haspopup,
        'aria-labelledby': aria?.labelledby,
        role: aria?.role,
        tabIndex: 0,
        ref: (node: HTMLButtonElement) => {
          triggerRef.current = node;
          if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        },
        ...props,
      })
    );
  }
);
// const Trigger = memo(
//   ({
//     children,
//     as: Component,
//     ...props
//   }: { children?: React.ReactNode } & TriggerProps & React.HTMLAttributes<HTMLElement>) => {
//     const { isOpen, toggle, aria, triggerRef } = useDropdownContext();

//     if (!Component) return null; // 예외 처리 추가
//     const isElementType = typeof Component === 'string' || typeof Component === 'function';

//     return isElementType ? (
//       <Component
//         className={styles.trigger}
//         onClick={toggle}
//         ref={triggerRef}
//         aria-expanded={isOpen}
//         aria-controls={aria?.controls}
//         aria-haspopup={aria?.haspopup}
//         aria-labelledby={aria?.labelledby}
//         role={aria?.role}
//         tabIndex={0}
//         {...props}
//       >
//         {children}
//       </Component>
//     ) : (
//       cloneElement(Component as React.ReactElement, {
//         className: styles.trigger,
//         onClick: toggle,
//         'aria-expanded': isOpen,
//         'aria-controls': aria?.controls,
//         'aria-haspopup': aria?.haspopup,
//         'aria-labelledby': aria?.labelledby,
//         role: aria?.role,
//         tabIndex: 0,
//         ...props,
//       })
//     );
//   }
// );

const Modal = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.modal}>{children}</div>;
};

const Menu = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, aria } = useDropdownContext();

  if (!isOpen) return null;

  return (
    <div
      className={styles.menu}
      id={aria?.controls}
      aria-labelledby={aria?.labelledby}
      role='listbox'
      tabIndex={-1}
    >
      <ul className={styles.list}>{children}</ul>
    </div>
  );
};

type ItemProps<T> = {
  option: {
    value: T;
    label: string;
  };
};

const Item = <T extends React.Key>({ option }: ItemProps<T>) => {
  const { onChange, toggle } = useDropdownContext();
  const handleClick = () => {
    onChange(option);
    toggle();
  };

  return (
    <li role='option' onClick={handleClick}>
      {option.label}
    </li>
  );
};

Header.displayName = 'Header';
Trigger.displayName = 'Trigger';

Dropdown.Header = Header;
Dropdown.Trigger = Trigger;
Dropdown.Modal = Modal;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;
