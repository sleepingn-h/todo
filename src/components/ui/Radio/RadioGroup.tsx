import type { RadioGroupContextType, RadioGroupProps, RadioProps } from '@/types/radio';
import { createContext, useContext } from 'react';
import { Radio } from './Radio';

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

export const RadioGroup: React.FC<RadioGroupProps> & {
  Radio: React.FC<RadioProps>;
} = ({ children, name, value, onChange }) => {
  return (
    <RadioGroupContext.Provider value={{ name, selectedValue: value, onChange }}>
      <div className='flex flex-col space-y-2'>{children}</div>
    </RadioGroupContext.Provider>
  );
};

export const useRadioContext = () => {
  const context = useContext(RadioGroupContext);

  if (!context) throw new Error('useRadioContext must be used within  RadioProvider');
  return context;
};

RadioGroup.Radio = Radio;
