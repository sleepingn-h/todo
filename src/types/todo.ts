export type Todo = {
  id: string;
  title: string;
  content: string;
  priority: string;
};

export type FetchTodo = Todo & {
  createdAt?: Date;
  updatedAt?: Date;
};

export type TodoOptions<T> = {
  value: T;
  label: string;
};

export type PriorityType = 'all' | 'urgent' | 'normal' | 'low';
export type SortType = 'createdAt' | 'updatedAt' | 'priority';
export type OrderType = 'asc' | 'desc';
