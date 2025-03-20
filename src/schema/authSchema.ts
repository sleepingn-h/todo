import { z } from 'zod';

export const emailSchema = z.string().email('유효한 이메일을 입력하세요');
// .min(5, '이메일은 최소 5자 이상이어야 합니다');

// 비밀번호 스키마
export const passwordSchema = z
  .string()
  .min(1, { message: '비밀번호를 입력해주세요' })
  .min(8, { message: '비밀번호는 8자 이상으로 입력해주세요.' });

// export const cPasswordSchema = z.string()
// .min(8, '비밀번호는 최소 8자 이상이어야 합니다') // 최소 8자
// .regex(/[a-zA-Z]/, '비밀번호는 영문자만 포함해야 합니다') // 영문자 포함
// .regex(/\d/, '비밀번호는 숫자를 포함해야 합니다') // 숫자 포함
// .regex(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호는 특수문자를 포함해야 합니다'); // 특수문자 포함

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  cpassword: passwordSchema,
});
