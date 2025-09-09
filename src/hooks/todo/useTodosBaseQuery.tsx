import { useTodoApi } from '@/context/TodoContext';
import { useQuery } from '@tanstack/react-query';
import type { FetchTodo } from '@/types/todo';

export const useTodosBaseQuery = () => {
  const { todoService } = useTodoApi();

  console.log('hehe');

  return useQuery<FetchTodo[]>({
    queryKey: ['todos'],
    queryFn: async () => await todoService.fetchTodo(),
    staleTime: 1000 * 60 * 5,
  });
};
