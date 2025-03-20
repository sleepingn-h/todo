export type RadioGroupProps = {
  children: React.ReactNode;
  name: string;
  value: string;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RadioGroupContextType = {
  name: string;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RadioProps = {
  value: string;
  label: string;
};

export type BaseRadioProps = {
  name: string;
  value: string;
  options: RadioOption[];
  className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RadioOption = {
  value: string;
  label: string;
};
