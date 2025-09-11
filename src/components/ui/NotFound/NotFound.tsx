import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';
import Button from '../Button/Button';

const NotFound = () => {
  return (
    <main className={styles?.wrap ?? ''} aria-labelledby='nf-title'>
      <h1 id='nf-title' className={styles?.title ?? ''}>
        페이지를 찾을 수 없어요
      </h1>
      <p className={styles?.desc ?? ''}>잘못된 주소이거나 삭제된 페이지일 수 있어요.</p>

      <Button as={Link} to={{ pathname: '/todos' }} variant='border' size='lg'>
        홈으로 이동
      </Button>
      {/* <Link className={styles?.button ?? ''}}>
          홈으로 이동
        </Link> */}
    </main>
  );
};

export default NotFound;
