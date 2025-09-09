import { generatePath, Link, useLocation } from 'react-router-dom';
import { formatPriorityToLocale } from '@/util/\bformat';
import styles from '@components/Todo/Todo.module.css';
import type { FetchTodo } from 'src/types/todo';
import classNames from 'classnames';

type Props = {
  todo: FetchTodo;
  id: string;
};

const TodoItem = ({ todo, id }: Props) => {
  const location = useLocation();
  const pathname = generatePath('/todos/:id', { id });
  const { title, priority } = todo;
  const priorityClass = classNames(styles.priority, styles[priority]);

  return (
    <Link className={styles.item} to={{ pathname, search: location.search }} state={{ todo }}>
      <span className={priorityClass}>{formatPriorityToLocale(priority)}</span>
      <span className={styles.text}>{title}</span>
    </Link>
  );
};

export default TodoItem;
