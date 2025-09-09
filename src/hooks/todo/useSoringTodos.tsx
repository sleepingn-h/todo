import type { QueryKeys, TodoOptions } from '@/types/todo';
import { useCallback, useEffect, useState } from 'react';

import useQueryParams from './useQueryParams';

const useSoringTodos = <T extends string>(
  key: keyof QueryKeys,
  options: TodoOptions<T>[],
  fallback: TodoOptions<T>
) => {
  const { updateQueryParams, searchParams } = useQueryParams();
  const [sort, setSort] = useState<TodoOptions<T>>(
    () => options.find((o) => o.value === searchParams.get(key)) ?? fallback
  );

  const onChange = useCallback(
    (opt: TodoOptions<T>) => {
      setSort(opt);
      updateQueryParams(key, opt);
    },
    [updateQueryParams, key]
  );

  useEffect(() => {
    const next = options.find((o) => o.value === searchParams.get(key)) ?? fallback;
    if (next.value !== sort.value) setSort(next);
  }, [searchParams, key, options, fallback, sort.value]);

  return [sort, onChange] as const;
};

export default useSoringTodos;
