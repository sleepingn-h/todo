import useTodosMutation from '@/hooks/todo/useTodosMutation';
import useTodosQuery from '@/hooks/todo/useTodosQuery';
import styles from '@components/Todo/Todo.module.css';
import type { FetchTodo } from '@/types/todo';
import { LuListTodo } from 'react-icons/lu';
import classNames from 'classnames';
import { useState } from 'react';

import AddTodoForm from './AddTodoForm/AddTodoForm';
import TodoList from './TodoList/TodoList';
import Button from '../ui/Button/Button';

const Todo = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: todos, isLoading, error } = useTodosQuery();
  const { createTodoItem } = useTodosMutation();

  const handleAdd = (todo: FetchTodo) => createTodoItem.mutate(todo);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={classNames(styles.list, styles.todo)}>
      <TodoList todos={todos || []} />
      <Button className={styles.button} size='lg' onClick={() => setOpenModal(true)}>
        <LuListTodo size={24} /> 추가하기
      </Button>
      <AddTodoForm onAdd={handleAdd} isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Todo;
