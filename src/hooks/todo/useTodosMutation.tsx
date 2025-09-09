import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { TodoResponse, FetchTodo } from '@/types/todo';
import { useTodoApi } from '@/context/TodoContext';

const useTodosMutation = () => {
  const queryClient = useQueryClient();
  const { todoService } = useTodoApi();
  const navigate = useNavigate();
  const location = useLocation();

  // 생성
  const createTodoItem = useMutation<
    TodoResponse,
    Error,
    FetchTodo
    // Omit<FetchTodo, 'id' | 'createdAt' | 'updatedAt'>
  >({
    mutationFn: (payload) => todoService.createTodo(payload),
    onSuccess: ({ data: todo }) => {
      // 1) 원본 캐시 즉시 갱신 (빠른 UI)
      queryClient.setQueryData<FetchTodo[]>(['todos'], (old) => (old ? [todo, ...old] : [todo]));

      // 2) 파생(정렬) 쿼리들은 한 번만 재계산
      queryClient.invalidateQueries({ queryKey: ['todos:sorted'] });

      // 3) 상세로 이동 (현재 검색조건 유지 + state로 시드)
      navigate(`/todos/${todo.id}${location.search}`, { state: { todo } });
    },
  });

  // (선택) 수정
  const updateTodoItem = useMutation<FetchTodo, Error, FetchTodo>({
    mutationFn: (updated) => todoService.updateTodo(updated),
    onSuccess: (updated) => {
      // 원본 반영
      queryClient.setQueryData<FetchTodo[]>(['todos'], (old) =>
        old ? old.map((t) => (t.id === updated.id ? updated : t)) : old
      );
      // 상세 캐시도 반영
      queryClient.setQueryData<FetchTodo>(['todo', updated.id], updated);
      // 파생 재계산
      queryClient.invalidateQueries({ queryKey: ['todos:sorted'] });
    },
  });

  // (선택) 삭제
  const deleteTodoItem = useMutation<string, Error, string>({
    mutationFn: (id) => todoService.deleteTodo(id).then(() => id),
    onSuccess: (id) => {
      queryClient.setQueryData<FetchTodo[]>(['todos'], (old) =>
        old ? old.filter((t) => t.id !== id) : old
      );
      queryClient.removeQueries({ queryKey: ['todo', id] });
      queryClient.invalidateQueries({ queryKey: ['todos:sorted'] });
    },
  });

  return { createTodoItem, updateTodoItem, deleteTodoItem };
};

export default useTodosMutation;
