import type { BaseRadioProps } from '@/types/radio';
import { RadioGroup } from './RadioGroup';

const BaseRadio = ({ name, value, options, onChange }: BaseRadioProps) => {
  return (
    <RadioGroup name={name} value={value} onChange={onChange}>
      {options.map(({ value, label }) => (
        <RadioGroup.Radio key={value} value={value} label={label} />
      ))}
    </RadioGroup>
  );
};

export default BaseRadio;
