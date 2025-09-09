import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useTodosMutation from '@/hooks/todo/useTodosMutation';
import styles from '@components/Todo/Todo.module.css';
import type { FetchTodo } from '@/types/todo';
import { useTodoQuery } from '@/hooks/todo';
import classNames from 'classnames';
import { useState } from 'react';

import AddTodoForm from '../AddTodoForm/AddTodoForm';
import TodoView from './TodoView';


const TodoViewContainer = () => {
  const navigate = useNavigate();
  const { todoId: id } = useParams<{ todoId: string }>();
  const { state } = useLocation() as { state?: { todo?: FetchTodo } };
  const [openModal, setOpenModal] = useState(false);
  const { data } = useTodoQuery(id!, state?.todo);
  const { updateTodoItem, deleteTodoItem } = useTodosMutation();
  const todo = (state?.todo ?? data)!;

  if (!id || !todo) return null;

  const handleUpdate = (updated: FetchTodo) => {
    return updateTodoItem.mutate(updated, {
      onSuccess: () => {
        navigate('.', { state: { todo: updated }, replace: true });
        setOpenModal(false);
      },
    });
  };

  const handleDelete = () => deleteTodoItem.mutate(id, { onSuccess: () => navigate('/todos') });

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
