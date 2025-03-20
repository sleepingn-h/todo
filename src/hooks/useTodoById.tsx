import { FetchTodo } from '@/types/todo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTodoApi } from '@/context/TodoContext';

const useTodoById = (todoId: string) => {
  const queryClient = useQueryClient();
  const { todoService } = useTodoApi();

  const todoQuery = useQuery<FetchTodo | FetchTodo[], Error>({
    queryKey: ['todos', todoId],
    queryFn: () => todoService.fetchTodo(todoId),
    staleTime: 1000 * 6 * 5,
  });

  const updateTodoItem = useMutation({
    mutationFn: (todo: FetchTodo) => todoService.updateTodo(todo, todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos', todoId] });
    },
  });

  const removeTodoItem = useMutation({
    mutationFn: () => todoService.deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.removeQueries({ queryKey: ['todo', todoId] });
    },
  });

  return { todoQuery, updateTodoItem, removeTodoItem };
};

export default useTodoById;
