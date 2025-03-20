import type { BaseInputProps } from '@/types/form';
import { forwardRef } from 'react';
import BaseInput from './BaseInput';

const TextInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ type = 'text', helper, ...props }, ref) => {
    return <BaseInput type={type} ref={ref} helper={helper} {...props} />;
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
