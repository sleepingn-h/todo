import type { PriorityType, OrderType, SortType } from '@/types/todo';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(
    () => ({
      priority: (searchParams.get('priority') as PriorityType) ?? 'all',
      sort: (searchParams.get('sort') as SortType) ?? '',
      order: (searchParams.get('order') as OrderType) ?? '',
      keyword: searchParams.get('keyword') ?? '',
    }),
    [searchParams]
  );

  const updateQueryParams = useCallback(
    <T extends string>(key: string, option: { label: T; value: T | '' }) => {
      const { value } = option;

      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === '' || value === 'all') next.delete(key as string);
          else next.set(key as string, String(value));
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return {
    queryParams,
    searchParams,
    updateQueryParams,
  };
};

export default useQueryParams;
