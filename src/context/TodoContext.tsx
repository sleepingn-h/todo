import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ITodoService } from '@/service/todos';

type TodoContextType = {
  todoService: ITodoService;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

type TodoProviderProps = {
  todoService: ITodoService;
  children: ReactNode;
};

export default function TodoProvider({ todoService, children }: TodoProviderProps) {
  const todo = useMemo(() => todoService, [todoService]);

  return <TodoContext.Provider value={{ todoService: todo }}>{children}</TodoContext.Provider>;
}

export const useTodoApi = () => {
  const context = useContext(TodoContext);

  if (!context) throw new Error('Cannot find TodoContext');
  return context;
};
