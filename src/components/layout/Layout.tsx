import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import Header from './Header';
import styles from '@components/layout/Layout.module.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const onLogout = () => logout();

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
