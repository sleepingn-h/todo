import type { FetchTodo } from '@/types/todo';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import useTodos from '@/hooks/todo/useTodos';
import TodoView from './TodoView';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import styles from '@components/Todo/Todo.module.css';

const TodoViewContainer = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const {
    todoQuery: { data: todo, isLoading, error },
    updateTodoItem,
    removeTodoItem,
  } = useTodos(todoId as string);

  const handleUpdate = (updated: FetchTodo) => updateTodoItem.mutate(updated);
  const handleDelete = () =>
    removeTodoItem.mutate(undefined, { onSuccess: () => navigate('/todos') });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!todo || Array.isArray(todo)) return null;

  return (
    <section className={classNames(styles.view, styles.todo)}>
      <TodoView todo={todo} onDelete={handleDelete} onClick={() => setOpenModal(true)} />
      <AddTodoForm
        todo={todo}
        isOpen={openModal}
        onAdd={handleUpdate}
        onClose={() => setOpenModal(false)}
      />
    </section>
  );
};

export default TodoViewContainer;
