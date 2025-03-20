import classNames from 'classnames';
import type { RadioProps } from '@/types/radio';
import { useRadioContext } from './RadioGroup';

import styles from './Radio.module.css';

export const Radio: React.FC<RadioProps> = ({ value, label }) => {
  const { name, selectedValue, onChange } = useRadioContext();
  const radioClassName = classNames(selectedValue === value ? styles.selected : '');

  return (
    <label className={styles.radio}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={selectedValue === value}
        onChange={onChange}
        className='hidden'
      />
      <span className={radioClassName}>{label}</span>
    </label>
  );
};
