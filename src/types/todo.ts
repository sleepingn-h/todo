export type Todo = {
  id: string;
  title: string;
  content: string;
  priority: string;
};

export type TodoResponse = { data: FetchTodo };

export type FetchTodo = Todo & {
  createdAt?: Date;
  updatedAt?: Date;
};

export type TodoOptions<T extends string> = {
  value: T;
  label: string;
  exception?: boolean;
};

export type PriorityType = 'all' | 'urgent' | 'normal' | 'low';
export type SortType = 'createdAt' | 'updatedAt' | 'priority';
export type OrderType = 'asc' | 'desc';

export type QueryKeys = {
  priority: PriorityType;
  sort: SortType;
  order: OrderType;
};
