import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTodoApi } from '@/context/TodoContext';
import type { FetchTodo } from '@/types/todo';

const useTodoQuery = (id: string, initial?: FetchTodo) => {
  const { todoService } = useTodoApi();
  const queryClient = useQueryClient();

  return useQuery<FetchTodo, Error, FetchTodo>({
    queryKey: ['todos', id],
    queryFn: () => todoService.getTodoById(id),
    enabled: !!id,
    initialData: () => {
      if (initial && initial.id === id) return initial;
      const list = queryClient.getQueryData<FetchTodo[]>(['todos']);
      return list?.find((t) => t.id === id);
    },
  });
};

export default useTodoQuery;
