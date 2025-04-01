import type { PriorityType, OrderType, SortType, TodoOptions } from '@/types/todo';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(
    () => ({
      priorityFilter: (searchParams.get('priorityFilter') as PriorityType) ?? 'all',
      sort: (searchParams.get('sort') as SortType) ?? '',
      order: (searchParams.get('order') as OrderType) ?? '',
      keyword: searchParams.get('keyword') ?? '',
    }),
    [searchParams]
  );

  const updateQueryParams = useCallback(
    (label: string, value: string) => {
      const updated = new URLSearchParams(searchParams);
      updated.set(label, value);
      setSearchParams(updated);
    },
    [searchParams, setSearchParams]
  );

  const getQueryParamValue = useCallback(
    <T,>(label: string, options: TodoOptions<T>[]) => {
      const value = searchParams.get(label);
      return options.find((opt) => String(opt.value) === value) || null;
    },
    [searchParams]
  );

  return {
    queryParams,
    updateQueryParams,
    getQueryParamValue,
  };
};

export default useQueryParams;
