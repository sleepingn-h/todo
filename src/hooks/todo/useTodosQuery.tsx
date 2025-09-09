import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTodoApi } from '@/context/TodoContext';
import { FetchTodo } from '@/types/todo';
import { sortTodos } from '@/util/sort';
import { useMemo } from 'react';

import useQueryParams from './useQueryParams';

const useTodosQuery = () => {
  const queyrClient = useQueryClient();
  const { queryParams } = useQueryParams();
  const { todoService } = useTodoApi();

  const params = useMemo(
    () => ({
      priority: queryParams.priority,
      sort: queryParams.sort || 'createdAt',
      order: queryParams.order || 'desc',
    }),
    [queryParams.priority, queryParams.sort, queryParams.order]
  );

  return useQuery<FetchTodo[]>({
    queryKey: ['todos:sorted', params], // ✅ 옵션 포함 파생 키
    queryFn: async () => {
      // 1) 원본 캐시가 있으면 그걸 사용
      const cached = queyrClient.getQueryData<FetchTodo[]>(['todos']);
      if (cached) return sortTodos(cached, params);

      // 2) 없으면 fetch → 원본 캐시에 저장 → 정렬
      const fetched = await todoService.fetchTodo();
      queyrClient.setQueryData<FetchTodo[]>(['todos'], fetched);
      return sortTodos(fetched, params);
    },
    // keepPreviousData: true,
    staleTime: 30_000,
  });
};

export default useTodosQuery;
