import type { FetchTodo } from 'src/types/todo';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { formatPriorityToLocale } from '@/util/\bformat';
import styles from '@components/Todo/Todo.module.css';

type Props = {
  todo: FetchTodo;
  id: string;
};

const TodoItem = ({ todo, id }: Props) => {
  const { title, priority } = todo;
  const priorityClass = classNames(styles.priority, styles[priority]);

  return (
    <Link className={styles.item} to={id} state={todo}>
      <span className={priorityClass}>{formatPriorityToLocale(priority)}</span>
      <span className={styles.text}>{title}</span>
    </Link>
  );
};

export default TodoItem;
