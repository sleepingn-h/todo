import TokenStorage from '@/service/token';
import HttpClient from '@/service/http';
import { loginSchema, signUpSchema } from '@/schema/authSchema';
import { AuthUser } from '@/types/auth';
import { User } from '@/types/users';

export interface IAuthService {
  login: (email: string, password: string) => Promise<AuthUser>;
  me: () => Promise<User | null>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, cpassword: string) => Promise<AuthUser>;
}

export default class AuthService implements IAuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async login(email: string, password: string): Promise<AuthUser> {
    const validateForm = loginSchema.safeParse({ email, password });

    if (!validateForm.success) {
      throw new Error('이메일/비밀번호를 다시 확인해주세요.');
    }

    // try {
    //   const data = await this.http.fetch(`/users/login`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   });

    //   this.tokenStorage.saveToken(data.token);

    //   return { status: 'SUCCESS', message: data.message, token: data.token };
    // } catch (error) {
    //   if (error instanceof Error) {
    //     throw new Error(error.message || '알 수 없는 오류가 발생했습니다.');
    //   }
    //   throw new Error('알 수 없는 오류가 발생했습니다.');
    // }

    try {
      const data = await this.http.fetch<AuthUser>(`/users/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      this.tokenStorage.saveToken(data.token as string);

      return { status: 'SUCCESS', message: data.message, token: data.token };
    } catch (error) {
      if (error instanceof Error) {
        return { status: 'FAIL', message: error.message || '알 수 없는 오류가 발생했습니다.' };
      }
      return { status: 'FAIL', message: '알 수 없는 오류가 발생했습니다.' };
    }
  }

  async me(): Promise<User | null> {
    const token = this.tokenStorage.getToken();

    if (!token) {
      return null;
    }

    return { token };
  }

  async logout() {
    this.tokenStorage.clearToken();
  }

  async signup(email: string, password: string, cpassword: string): Promise<AuthUser> {
    const validateForm = signUpSchema.safeParse({ email, password, cpassword });

    if (!validateForm.success) {
      return { status: 'FAIL', message: '유효하지 않은 입력값입니다.' };
    }

    try {
      const data = await this.http.fetch<AuthUser>('/users/create', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      this.tokenStorage.saveToken(data.token as string);

      return { status: 'SUCCESS', message: data.message, token: data.token };
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return { status: 'FAIL', message: error.message };
      }
      console.error('Unexpected signup error:', error);
      return { status: 'FAIL', message: '알 수 없는 오류가 발생했습니다.' };
    }
  }
}
