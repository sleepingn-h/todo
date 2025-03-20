export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'filled' | 'outlined';
export type InputWidth = 'full' | 'half' | 'auto';
export type ValidationState = 'default' | 'invalid' | 'valid';
export type Direction = 'left' | 'center' | 'right';
export type InputHelper = {
  type: 'helper' | 'error';
  variant: string;
};

export type InputStyleProps = {
  size?: InputSize;
  variant?: InputVariant;
  validationState?: ValidationState;
  InputWidth?: InputWidth;
};

export type InputCommonProps = {
  id: string;
  name?: string;
  label: string;
  labelHidden?: boolean;
  required?: boolean;
  helper?: InputHelper;
};

export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  InputStyleProps &
  InputCommonProps & {
    icon?: React.ReactNode;
    iconDir?: Direction;
    containerClassName?: string;
  };

export type TextInputProps = Omit<BaseInputProps, 'type'>;

export type TextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
  InputStyleProps &
  InputCommonProps & {
    containerClassName?: string;
  };
