import styles from '@components/Todo/Todo.module.css';
import type { FetchTodo } from '@/types/todo';

import TodoSorting from '../TodoSorting/TodoSorting';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos }: { todos: FetchTodo[] }) => {
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
                <TodoItem todo={todo} id={todo.id} />
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default TodoList;
