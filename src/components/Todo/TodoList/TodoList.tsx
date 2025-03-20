import type { FetchTodo } from '@/types/todo';
import { useLocation } from 'react-router-dom';

import TodoItem from '../TodoItem/TodoItem';
import TodoSorting from '../TodoSorting/TodoSorting';

import styles from '@components/Todo/Todo.module.css';

const TodoList = ({ todos }: { todos: FetchTodo[] }) => {
  const location = useLocation();

  return (
    <>
      <div className={styles.sorting}>
        <TodoSorting />
      </div>
      <ul>
        {todos?.length === 0 ? (
          <li>데이터가 없습니다</li>
        ) : (
          <>
            {todos?.map((todo) => (
              <li key={todo.id}>
                <TodoItem todo={todo} id={`${todo.id}${location.search ?? ''}`} />
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default TodoList;
