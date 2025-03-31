import { useState } from 'react';
import { loginSchema } from '@/schema/authSchema';
import type { LoginFormData } from '@/types/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/context/AuthContext';

import Button from '@/components/ui/Button/Button';
import TextInput from '@/components/ui/Form/TextInput';

import styles from '@/components/ui/Form/Form.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { logIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const { email, password } = data;
      const res = await logIn(email, password);

      if (res.status === 'SUCCESS') {
        setIsSubmitting(false);
        navigate('/');
      } else {
        alert('로그인에 실패하였습니다.');
        setIsSubmitting(false);
        setFocus('email');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('서버 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.inputs}>
          <TextInput
            label='이메일'
            id='email'
            placeholder='Please enter your email'
            {...register('email', { required: true })}
          />
          {errors.email && <p className={styles.info}>{errors.email.message}</p>}
        </div>
        <div className={styles.inputs}>
          <TextInput
            label='비밀번호'
            id='password'
            type='password'
            placeholder='Please enter your password '
            {...register('password', { required: true })}
          />
          {errors.password && <p className={styles.info}>{errors.password.message}</p>}
        </div>
        <Button size='lg' type='submit' disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>
      <Link to='/auth/signup' aria-label='회원가입 페이지로 이동'>
        회원가입
      </Link>
    </section>
  );
};

export default LoginPage;
