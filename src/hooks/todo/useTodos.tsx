import type { FetchTodo } from '@/types/todo';
import useTodoQuery from './useTodoQuery';
import useQueryParams from './useQueryParams';
import useFilteredTodos from './useFilteredTodos';

const useTodos = (id?: string) => {
  const { todoQuery, createTodoItem, updateTodoItem, removeTodoItem } = useTodoQuery(id);
  const { queryParams, updateQueryParams, getQueryParamValue } = useQueryParams();
  const filteredTodos = useFilteredTodos(
    !id ? (todoQuery.data as FetchTodo[]) : undefined,
    queryParams
  );

  return {
    todoQuery,
    filteredTodos,
    createTodoItem,
    updateTodoItem,
    removeTodoItem,
    updateQueryParams,
    getQueryParamValue,
  };
};

export default useTodos;
