import type { IAuthService } from '@/service/auth';
import type { AuthError, AuthUser } from '@/types/auth';
import type { User } from '@/types/users';
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type AuthContextType = {
  user?: User | null;
  signUp: (email: string, password: string, cpassword: string) => Promise<AuthUser>;
  logIn: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  authService: IAuthService;
  authErrorEventBus: AuthErrorEventBus;
  children: ReactNode;
};

export function AuthProvider({ authService, authErrorEventBus, children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authErrorEventBus //
      .listen((err: Error) => {
        console.log(err);
        setUser(null);
      });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.me().then(setUser).catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (email: string, password: string, cpassword: string) => {
      const user = await authService.signup(email, password, cpassword);

      if (user.status === 'SUCCESS') {
        setUser({ token: user.token ?? '' });
      }

      return user;
    },
    [authService]
  );

  const logIn = useCallback(
    async (email: string, password: string) => {
      const user = await authService.login(email, password);

      if (user.status === 'SUCCESS') {
        setUser({ token: user.token ?? '' });
      }

      return user;
    },
    [authService]
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, [authService]);

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logout,
    }),
    [user, signUp, logIn, logout]
  );

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}

export class AuthErrorEventBus {
  private callback?: AuthError;

  listen(callback: AuthError): void {
    this.callback = callback;
  }
  notify(error: Error) {
    if (this.callback) {
      this.callback(error);
    }
  }
}

export default AuthContext;
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Cannot find AuthContext');
  return context;
};
