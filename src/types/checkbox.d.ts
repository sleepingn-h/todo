export type CheckboxLabelProps = {
  label?: boolean;
};

export type CheckboxToggleProps = {
  icon: boolean;
};

export type CheckboxContextProps = {
  isChecked: boolean;
  toggleCheckbox: () => void;
} & CheckboxProviderProps;

export type CheckboxProviderProps = {
  id: string;
  name: string;
};
