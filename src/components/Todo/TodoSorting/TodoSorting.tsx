import {
  TbAdjustmentsHorizontal,
  TbFilter,
  TbSortAscending,
  TbSortDescending,
} from 'react-icons/tb';
import { orderOptions, priorityOptions, sortOptions } from '@/constants/todos';
import type { OrderType, SortType, PriorityType } from '@/types/todo';
import useSoringTodos from '@/hooks/todo/useSoringTodos';
import styles from '@components/Todo/Todo.module.css';
import classNames from 'classnames';

import FilteredTodo from '../FilteredTodo/FilteredTodo';
import FilteredToggle from '../FilteredToggle';

const TodoSorting = () => {
  const [priority, onPriorityChange] = useSoringTodos<PriorityType>(
    'priority',
    priorityOptions,
    priorityOptions[0]
  );
  const [sort, onSortChange] = useSoringTodos<SortType>('sort', sortOptions, sortOptions[0]);
  const [order, onOrderChange] = useSoringTodos<OrderType>('order', orderOptions, orderOptions[0]);

  return (
    <>
      <FilteredTodo
        value={priority}
        onChange={onPriorityChange}
        options={priorityOptions}
        title='정렬'
        aria={{ id: 'filteredPriority', controls: 'priorityList' }}
        trigger={
          <button className={classNames(styles.button, styles.priority)}>
            <TbAdjustmentsHorizontal />
            <span>{priority?.label}</span>
          </button>
        }
      />
      <FilteredTodo
        value={sort}
        onChange={onSortChange}
        options={sortOptions}
        title='일자'
        aria={{ id: 'filteredSort', controls: 'sortList' }}
        trigger={
          <button>
            <TbFilter />
            <span>{sort?.label}</span>
          </button>
        }
      />
      <FilteredToggle
        order={order}
        onChange={onOrderChange}
        options={orderOptions}
        className={styles.order}
        icon={{ asc: <TbSortAscending />, desc: <TbSortDescending /> }}
      />
    </>
  );
};

export default TodoSorting;
