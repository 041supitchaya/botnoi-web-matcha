
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading || !isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
