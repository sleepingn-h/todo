import { FetchTodo, OrderType, PriorityType, SortType } from '@/types/todo';

const priorityRank: Record<Exclude<PriorityType, 'all'>, number> = {
  urgent: 3,
  normal: 2,
  low: 1,
};
const asTime = (d?: Date | string) =>
  d instanceof Date ? d.getTime() : d ? new Date(d).getTime() : 0;

export function sortTodos(
  todos: FetchTodo[],
  params: { priority: PriorityType; sort: SortType; order: OrderType }
) {
  const { priority, sort, order } = params;

  const filtered = priority === 'all' ? todos : todos.filter((t) => t.priority === priority);

  return filtered.slice().sort((a, b) => {
    const ka =
      sort === 'priority'
        ? priorityRank[a.priority as Exclude<PriorityType, 'all'>] ?? 0
        : sort === 'createdAt'
        ? asTime(a.createdAt)
        : asTime(a.updatedAt);
    const kb =
      sort === 'priority'
        ? priorityRank[b.priority as Exclude<PriorityType, 'all'>] ?? 0
        : sort === 'createdAt'
        ? asTime(b.createdAt)
        : asTime(b.updatedAt);

    return order === 'asc' ? ka - kb : kb - ka;
  });
}
