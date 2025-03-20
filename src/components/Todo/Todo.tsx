import { useState } from 'react';

import type { FetchTodo } from '@/types/todo';

import classNames from 'classnames';

import useTodos from '@/hooks/useTodos';
import Button from '../ui/Button/Button';
import TodoList from './TodoList/TodoList';
import AddTodoForm from './AddTodoForm/AddTodoForm';
import { LuListTodo } from 'react-icons/lu';

import styles from '@components/Todo/Todo.module.css';

const Todo = () => {
  const [openModal, setOpenModal] = useState(false);

  const {
    filteredTodos: todos,
    todoQuery: { isLoading, error },
    createTodoItem,
  } = useTodos();

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
