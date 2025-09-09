import styles from '@components/Todo/Todo.module.css';
import Todo from '@/components/Todo/Todo';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className={styles.section}>
      <Todo />
      <Outlet />
    </section>
  );
};

export default HomePage;
