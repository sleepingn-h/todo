import { OrderType, PriorityType, SortType, type TodoOptions } from '@/types/todo';

export const priorityOptions: TodoOptions<PriorityType>[] = [
  { value: 'all', label: '전체' },
  { value: 'urgent', label: '긴급' },
  { value: 'normal', label: '보통' },
  { value: 'low', label: '낮음' },
];

export const sortOptions: TodoOptions<SortType>[] = [
  { value: 'createdAt', label: '등록일' },
  { value: 'updatedAt', label: '수정일' },
  { value: 'priority', label: '우선순위' },
];

export const orderOptions: TodoOptions<OrderType>[] = [
  { value: 'asc', label: '오름차순' },
  { value: 'desc', label: '내림차순' },
];
