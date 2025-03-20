import type { FetchTodo, PriorityType } from '@/types/todo';
import { useState } from 'react';
import { priorityOptions } from '@/constants/todos';
import BaseRadio from '@/components/ui/Radio/BaseRadio';

type PriorityRadioFormProps = {
  form: FetchTodo;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PriorityRadioForm = ({ form, onChange }: PriorityRadioFormProps) => {
  const [selectedValue, setSelectedValue] = useState<Omit<PriorityType, 'all'>>(form.priority);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    onChange(e);
  };

  return (
    <BaseRadio
      name='priority'
      value={selectedValue as string}
      options={priorityOptions}
      onChange={handleChange}
    />
  );
};

export default PriorityRadioForm;
