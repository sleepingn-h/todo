import classNames from 'classnames';

import { formatDateISO, formatDateToLocale, formatPriorityToLocale } from '@/util/\bformat';
import Button from '@/components/ui/Button/Button';
import styles from '@components/Todo/Todo.module.css';
import { FetchTodo } from '@/types/todo';

type TodoViewProps = {
  todo: FetchTodo;
  onDelete: () => void;
  onClick: () => void;
};

const TodoView = ({ todo, onDelete, onClick }: TodoViewProps) => {
  const { title, content, createdAt, priority } = todo;
  const translatePriorityLang = formatPriorityToLocale(priority);

  return (
    <section className={classNames(styles.view, styles.todo)}>
      <div className={styles.top}>
        <h2 className={styles.title}>
          <span className={classNames(styles.priority, styles[priority])}>
            {translatePriorityLang}
          </span>
          {title}
        </h2>
        <time className={styles.time} dateTime={formatDateISO(createdAt as Date)}>
          {formatDateToLocale(createdAt as Date, 'ko-KR')}
        </time>
      </div>
      <div className={styles.center}>
        <p className={styles.content}>{content}</p>
      </div>
      <div className={styles.bottom}>
        <Button color='dark' onClick={onClick}>
          수정
        </Button>
        <Button variant={'border'} color='gray' onClick={onDelete}>
          삭제
        </Button>
      </div>
    </section>
  );
};

export default TodoView;
