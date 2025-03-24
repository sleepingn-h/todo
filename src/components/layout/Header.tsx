import type { User } from '@/types/users';
import { Link } from 'react-router-dom';

import Button from '@components/ui/Button/Button';
import { LuListTodo } from 'react-icons/lu';

import styles from '@components/layout/Layout.module.css';

type Props = {
  user?: User | null;
  onLogout: () => void;
};

const Header = ({ user, onLogout }: Props) => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={'/'}>
        <LuListTodo /> Todo
      </Link>
      {user ? (
        <Button variant='border' onClick={onLogout}>
          로그아웃
        </Button>
      ) : (
        <Link to={'/auth/login'}>로그인</Link>
      )}
    </header>
  );
};

export default Header;
