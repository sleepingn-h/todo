import { Outlet } from 'react-router-dom';
import Todo from '@/components/Todo/Todo';
import styles from '@components/Todo/Todo.module.css';

const HomePage = () => {
  return (
    <section className={styles.section}>
      <Todo />
      <Outlet />
    </section>
  );
};

export default HomePage;
