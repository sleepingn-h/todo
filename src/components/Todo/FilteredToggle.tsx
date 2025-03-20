import type { AriaProps } from '@/types/a11y';
import type { TodoOptions } from '@/types/todo';

import { useMemo } from 'react';
import ButtonIcon from '../ui/Button/ButtonIcon';

type ToggleIcon = {
  asc: React.ReactNode;
  desc: React.ReactNode;
};

type FilteredToggleProps<T extends keyof ToggleIcon> = {
  order: TodoOptions<T>;
  onChange: (value: TodoOptions<T>) => void;
  aria?: AriaProps;
  options: TodoOptions<T>[];
  icon: ToggleIcon;
  className: string;
};

const FilteredToggle = <T extends keyof ToggleIcon>({
  order,
  onChange,
  options,
  icon,
  className,
}: FilteredToggleProps<T>) => {
  const currentIcon = useMemo(() => icon[order.value], [icon, order.value]);
  const handleToggle = () => {
    const next = options.find((option: TodoOptions<T>) => option.value !== order.value);
    console.log(next);
    if (!next) return;
    onChange(next);
  };

  return (
    <ButtonIcon
      className={className}
      label={order.label}
      icon={currentIcon}
      onClick={handleToggle}
    />
  );
};

export default FilteredToggle;
