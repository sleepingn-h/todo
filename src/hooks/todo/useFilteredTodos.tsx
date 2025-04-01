import type { FetchTodo } from '@/types/todo';
import { useMemo } from 'react';

type FilteredTodosProps = {
  priorityFilter?: string;
  sort?: string;
  order?: string;
  keyword?: string;
};
const useFilteredTodos = (todos: FetchTodo[] | undefined, params: FilteredTodosProps) => {
  return useMemo(() => {
    if (!todos) return [];

    const { priorityFilter, keyword, order, sort } = params;

    return todos
      .filter((todo) => priorityFilter === 'all' || todo.priority === priorityFilter)
      .filter((todo) => !keyword || todo.title.toLowerCase().includes(keyword.toLowerCase()))
      .sort((a, b) => {
        const sortKey = (sort || 'createdAt') as keyof FetchTodo;
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order === 'desc' ? bValue - aValue : aValue - bValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return order === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
        }
        return 0;
      });
  }, [todos, params]);
};

export default useFilteredTodos;
