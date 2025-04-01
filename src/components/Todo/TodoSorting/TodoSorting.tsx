import { useState } from 'react';

import type { OrderType, SortType, PriorityType, TodoOptions } from '@/types/todo';

import classNames from 'classnames';
import { orderOptions, priorityOptions, sortOptions } from '@/constants/todos';
import FilteredTodo from '../FilteredTodo/FilteredTodo';
import FilteredToggle from '../FilteredToggle';
import {
  TbAdjustmentsHorizontal,
  TbFilter,
  TbSortAscending,
  TbSortDescending,
} from 'react-icons/tb';
import styles from '@components/Todo/Todo.module.css';
import useTodos from '@/hooks/todo/useTodos';

const TodoSorting = () => {
  const { getQueryParams, updateQueryParams } = useTodos();
  const [priorityFilter, priorityFilterChange] = useState<TodoOptions<PriorityType>>(
    getQueryParams('priorityFilter', priorityOptions) ?? priorityOptions[0]
  );
  const [sort, sortChange] = useState<TodoOptions<SortType>>(
    getQueryParams('sort', sortOptions) ?? sortOptions[0]
  );
  const [order, orderChange] = useState<TodoOptions<OrderType>>(
    getQueryParams('order', orderOptions) ?? orderOptions[0]
  );

  const setSort = <T extends string>(
    target: string,
    option: TodoOptions<T>,
    callback: (option: TodoOptions<T>) => void
  ) => {
    callback(option);
    updateQueryParams(target, option.value);
  };
  const handlePriorityChange = (option: TodoOptions<PriorityType>) =>
    setSort('priorityFilter', option, priorityFilterChange);
  const handleSortChange = (option: TodoOptions<SortType>) => setSort('sort', option, sortChange);
  const handleOrderChange = (option: TodoOptions<OrderType>) =>
    setSort('order', option, orderChange);

  return (
    <>
      <FilteredTodo
        value={priorityFilter}
        onChange={handlePriorityChange}
        options={priorityOptions}
        title='정렬'
        aria={{ id: 'filteredPriority', controls: 'priorityList' }}
        trigger={
          <button className={classNames(styles.button, styles.priority)}>
            <TbAdjustmentsHorizontal />
            <span>{priorityFilter?.label}</span>
          </button>
        }
      />
      <FilteredTodo
        value={sort}
        onChange={handleSortChange}
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
        onChange={handleOrderChange}
        options={orderOptions}
        className={styles.order}
        icon={{ asc: <TbSortAscending />, desc: <TbSortDescending /> }}
      />
    </>
  );
};

export default TodoSorting;
