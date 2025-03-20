import type { BaseRadioProps } from '@/types/radio';
import { RadioGroup } from './RadioGroup';

const BaseRadio = ({ className, name, value, options, onChange, ...props }: BaseRadioProps) => {
  return (
    <RadioGroup name={name} value={value} onChange={onChange} className={className} {...props}>
      {options.map(({ value, label }) => (
        <RadioGroup.Radio key={value} value={value} label={label} />
      ))}
    </RadioGroup>
  );
};

export default BaseRadio;
