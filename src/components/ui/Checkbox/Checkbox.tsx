import classNames from 'classnames';

import { CheckboxProvider, useCheckboxContext } from './CheckboxProvider';
import { CheckboxLabelProps, CheckboxProviderProps } from '@/types/checkbox';

import { IoCheckbox, IoCheckboxOutline } from 'react-icons/io5';

import styles from './Checkbox.module.css';

const Checkbox = ({
  children,
  id,
  name,
}: { children: React.ReactNode } & CheckboxProviderProps) => {
  return (
    <CheckboxProvider id={id} name={name}>
      {children}
    </CheckboxProvider>
  );
};

const Label = ({ children, label = false }: { children: React.ReactNode } & CheckboxLabelProps) => {
  const className = classNames(label && styles.hidden);
  const { isChecked, id } = useCheckboxContext();

  return (
    <label htmlFor={id} className={className}>
      {isChecked && <IoCheckbox />}
      {!isChecked && <IoCheckboxOutline />}
      {children}
    </label>
  );
};

const Toggle = () => {
  const { isChecked, toggleCheckbox, id, name } = useCheckboxContext();

  return (
    <input
      className={styles.hidden}
      type='checkbox'
      name={name}
      id={id}
      checked={isChecked}
      onChange={toggleCheckbox}
    />
  );
};

Checkbox.Label = Label;
Checkbox.Toggle = Toggle;

export default Checkbox;
