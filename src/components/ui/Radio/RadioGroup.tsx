import type { RadioGroupContextType, RadioGroupProps, RadioProps } from '@/types/radio';
import { createContext, useContext } from 'react';
import { Radio } from './Radio';
import styles from './Radio.module.css';
import classNames from 'classnames';

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

export const RadioGroup: React.FC<RadioGroupProps> & {
  Radio: React.FC<RadioProps>;
} = ({ children, name, value, onChange, className }) => {
  const radioClassName = classNames(styles.radio, className);

  return (
    <RadioGroupContext.Provider value={{ name, selectedValue: value, onChange }}>
      <div className={radioClassName}>{children}</div>
    </RadioGroupContext.Provider>
  );
};

export const useRadioContext = () => {
  const context = useContext(RadioGroupContext);

  if (!context) throw new Error('useRadioContext must be used within  RadioProvider');
  return context;
};

RadioGroup.Radio = Radio;
