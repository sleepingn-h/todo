import Dropdown from '@/components/ui/Dropdown/Dropdown';
import type { TodoOptions } from '@/types/todo';
import type { AriaProps } from '@/types/a11y';

type FilteredTodoProps<T extends string> = {
  title: string;
  value: TodoOptions<T>;
  onChange: (value: TodoOptions<T>) => void;
  options: TodoOptions<T>[];
  aria?: AriaProps;
  trigger: React.ReactElement | React.ElementType | React.ReactNode;
};

const FilteredTodo = <T extends string>({
  title,
  trigger,
  value,
  onChange,
  options,
  aria,
}: FilteredTodoProps<T>) => {
  return (
    <Dropdown value={value} onChange={onChange} aria={aria}>
      <Dropdown.Header as='h2' hidden>
        {title}
      </Dropdown.Header>
      <Dropdown.Trigger as={trigger} />
      <Dropdown.Menu>
        {options.map((option: TodoOptions<T>) => (
          <Dropdown.Item option={option} key={option.value} />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilteredTodo;
