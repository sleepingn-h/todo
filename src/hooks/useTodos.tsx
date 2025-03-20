import type { FetchTodo, OrderType, PriorityType, SortType, TodoOptions } from '@/types/todo';
import { useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useTodoApi } from '@/context/TodoContext';

type FilteredTodosProps = {
  priorityFilter?: PriorityType;
  sort?: SortType;
  order?: OrderType;
  keyword?: string;
};

const useTodos = (id?: string) => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { todoService } = useTodoApi();

  const todoQuery = useQuery<FetchTodo[] | FetchTodo, Error>({
    queryKey: ['todos', id],
    queryFn: () => todoService.fetchTodo(id),
    staleTime: 1000 * 6 * 5,
  });

  const createTodoItem = useMutation({
    mutationFn: (todo: FetchTodo) => todoService.createTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodoItem = useMutation({
    mutationFn: (todo: FetchTodo) => todoService.updateTodo(todo, id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos', id] });
    },
  });

  const removeTodoItem = useMutation({
    mutationFn: () => todoService.deleteTodo(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.removeQueries({ queryKey: ['todo', id] });
    },
  });

  const queryParmas = useMemo(
    () => ({
      priorityFilter: (searchParams.get('priorityFilter') as PriorityType) ?? 'all',
      sort: (searchParams.get('sort') as SortType) ?? '',
      order: (searchParams.get('order') as OrderType) ?? '',
      keyword: (searchParams.get('keyword') as string) ?? '',
    }),
    [searchParams]
  );

  const filteredTodos = useMemo(
    () => !id && getFilteredTodo(todoQuery.data as FetchTodo[], queryParmas),
    [id, queryParmas, todoQuery.data]
  );

  const updateQueryParams = useCallback(
    (label: string, value: string) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set(label, value);
      setSearchParams(updatedSearchParams);
    },
    [searchParams, setSearchParams]
  );

  const getQueryParams = useCallback(
    <T,>(label: string, options: TodoOptions<T>[]) => {
      const value = searchParams.get(label);
      if (!value) return null;

      return options.find((option) => String(option.value) === value) || null;
    },
    [searchParams]
  );

  return {
    todoQuery,
    filteredTodos,
    createTodoItem,
    updateTodoItem,
    removeTodoItem,
    updateQueryParams,
    getQueryParams,
  };
};

function getFilteredTodo(todos: FetchTodo[], params: FilteredTodosProps): FetchTodo[] {
  console.log(params);
  const { priorityFilter, keyword, order } = params;

  return (todos || [])
    .filter((todo) => priorityFilter === 'all' || todo.priority === priorityFilter)
    .filter((todo) => (!keyword ? true : todo.title.toLowerCase().includes(keyword.toLowerCase())))
    .sort((a, b) => {
      let sort = params.sort;
      if (!sort) {
        sort = 'createdAt';
      }

      if (!(sort in a) || !(sort in b)) return 0;

      const aValue = a[sort];
      const bValue = b[sort];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'desc' ? bValue - aValue : aValue - bValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return order === 'desc' ? -comparison : comparison;
      } else {
        return 0;
      }
    });
}

export default useTodos;
