export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'filled' | 'border' | 'text' | 'icon' | 'icon-round';
export type ButtonColor = 'primary' | 'secondary' | 'light' | 'dark' | 'gray';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
};
