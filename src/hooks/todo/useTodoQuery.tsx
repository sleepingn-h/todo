import type { FetchTodo } from '@/types/todo';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTodoApi } from '@/context/TodoContext';

const useTodoQuery = (id?: string) => {
  const { todoService } = useTodoApi();
  const queryClient = useQueryClient();

  const todoQuery = useQuery<FetchTodo[] | FetchTodo, Error>({
    queryKey: ['todos', id],
    queryFn: () => todoService.fetchTodo(id),
    staleTime: 1000 * 60 * 5,
  });

  const createTodoItem = useMutation({
    mutationFn: (todo: FetchTodo) => todoService.createTodo(todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
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
      queryClient.removeQueries({ queryKey: ['todos', id] });
    },
  });

  return {
    todoQuery,
    createTodoItem,
    updateTodoItem,
    removeTodoItem,
  };
};
export default useTodoQuery;
