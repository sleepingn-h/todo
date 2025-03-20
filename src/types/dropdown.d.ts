import type { AriaProps } from './a11y';

export type DropdownProviderProps = DropdownProps & {
  children: React.ReactNode;
};

export type DropdownContextProps = DropdownProps & {
  isOpen: boolean;
  toggle: () => void;
  dropdownRef: HTMLDivElement | null;
  triggerRef: HTMLButtonElement | null;
};

export type DropdownProps<T> = {
  value: T;
  onChange: (value: T) => void;
  type?: 'combo' | 'multi';
  aria?: AriaProps;
};
