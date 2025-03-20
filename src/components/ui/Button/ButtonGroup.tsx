import type { ButtonProps } from '@/types/button';
import classNames from 'classnames';
import styles from './Button.module.css';

type ButtonGroupProps = ButtonProps & {
  children: React.ReactNode;
  className?: string;
};

const ButtonGroup = ({ children, className }: ButtonGroupProps) => {
  const buttonGroup = classNames(styles.buttons, className);
  return <div className={buttonGroup}>{children}</div>;
};

export default ButtonGroup;
