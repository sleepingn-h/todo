import { useAuth } from '@/context/AuthContext';
import { type ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to={'/auth/login'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
