import { useState } from 'react';
import { signUpSchema } from '@/schema/authSchema';
import { SignupFormData } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/ui/Button/Button';
import TextInput from '@/components/ui/Form/TextInput';

import styles from '@components/ui/Form/Form.module.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      const { email, password, cpassword } = data;
      const res = await signUp(email, password, cpassword);

      if (res.status === 'SUCCESS') {
        setIsSubmitting(false);
        navigate('/auth/login');
      } else {
        alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
        setIsSubmitting(false);
        setFocus('email');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('서버 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <TextInput
            label='이메일'
            id='email'
            placeholder='Please enter your email '
            {...register('email', { required: true })}
          />
          {errors.email && <p className={styles.info}>{errors.email.message}</p>}
        </div>
        <div className={styles.inputs}>
          <TextInput
            label='비밀번호'
            id='password'
            placeholder='Please enter your password '
            {...register('password', { required: true })}
          />
          {errors.password && <p className={styles.info}>{errors.password.message}</p>}
        </div>
        <div className={styles.inputs}>
          <TextInput
            label='비밀번호 확인'
            id='cpassword'
            placeholder='Please enter your password '
            {...register('cpassword', { required: true })}
          />
          {errors.cpassword && <p className={styles.info}>{errors.cpassword.message}</p>}
        </div>
        <Button size='lg' type='submit' disabled={isSubmitting}>
          {isSubmitting ? '회원가입 중...' : '회원가입'}
        </Button>
      </form>
    </section>
  );
};

export default SignupPage;
