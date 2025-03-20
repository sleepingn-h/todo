import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IAuthService } from '@/service/auth';
import { ITodoService } from '@/service/todos';
import { AuthErrorEventBus, AuthProvider } from '@/context/AuthContext';
import TodoProvider from '@/context/TodoContext';

import router from '@/router';

const queryClient = new QueryClient();

type Props = {
  authService: IAuthService;
  authErrorEventBus: AuthErrorEventBus;
  todoService: ITodoService;
};

function App({ authService, authErrorEventBus, todoService }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
        <TodoProvider todoService={todoService}>
          <RouterProvider router={router} />
        </TodoProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
