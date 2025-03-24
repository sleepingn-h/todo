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
  } = useForm<SignupFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const { signUp } = useAuth();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { email, password, cpassword } = data;
      signUp(email, password, cpassword);
      navigate('/auth/login');
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
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={styles.inputs}>
          <TextInput
            label='비밀번호'
            id='password'
            placeholder='Please enter your password '
            {...register('password', { required: true })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className={styles.inputs}>
          <TextInput
            label='비밀번호 확인'
            id='cpassword'
            placeholder='Please enter your password '
            {...register('cpassword', { required: true })}
          />
          {errors.cpassword && <p>{errors.cpassword.message}</p>}
        </div>
        <Button size='lg' type='submit'>
          회원가입
        </Button>
      </form>
    </section>
  );
};

export default SignupPage;
